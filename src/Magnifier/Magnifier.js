export class Magnifier {
  /**
   * show origin canvas
   */
  canvas = null

  /**
   * show magnified canvas
   */
  offCanvas = null

  context = null

  offContext = null

  /**
   * magnification
   */
  scale = 0

  /**
   * radius
   */
  r = 0

  /**
   * whether the mouse is pressed
   */
  isMouseDown = false

  imgUrl = ''

  constructor(props) {
    this.scale = props.scale || 2
    this.r = props.r || 100
    this.imgUrl = props.imgUrl

    this.initCanvas(props)
    this.drawImage()
    this.registerEvents()
  }

  initCanvas(props) {
    this.canvas = props.canvas
    this.offCanvas = props.offCanvas

    this.context = this.canvas.getContext('2d')
    this.offContext = this.offCanvas.getContext('2d')

    this.canvas.width = props.width
    this.canvas.height = props.height

    this.offCanvas.width = this.canvas.width * this.scale
    this.offCanvas.height = this.canvas.height * this.scale
  }

  drawImage() {
    this.image = new Image()
    this.image.src = this.imgUrl

    this.offImage = new Image()
    this.offImage.src = this.imgUrl

    this.image.onload = () => {
      this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    }

    this.offImage.onload = () => {
      this.offContext.drawImage(this.offImage, 0, 0, this.offCanvas.width, this.offCanvas.height)
    }
  }

  registerEvents() {
    this.handleMousedown()
    this.handleMouseup()
    this.handleMouseout()
    this.handleMousemove()
  }

  handleMousedown() {
    this.canvas.onmousedown = e => {
      e.preventDefault()
      this.isMouseDown = true
      const point = this.getPoint(e)
      this.drawCanvasWithMagnifier(true, point)
    }
  }

  handleMouseup() {
    this.canvas.onmouseup = e => {
      e.preventDefault()
      this.isMouseDown = false
      this.drawCanvasWithMagnifier(false)
    }
  }

  handleMouseout() {
    this.canvas.onmouseout = e => {
      e.preventDefault()
      this.isMouseDown = false
      this.drawCanvasWithMagnifier(false)
    }
  }

  handleMousemove() {
    this.canvas.onmousemove = e => {
      e.preventDefault()
      if (this.isMouseDown) {
        const point = this.getPoint(e)
        this.drawCanvasWithMagnifier(true, point)
      }
    }
  }

  getPoint(e) {
    return {
      x: e.offsetX,
      y: e.offsetY
    }
  }

  drawCanvasWithMagnifier(isShowMagnifier, point) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)

    if (isShowMagnifier) {
      this.drawMagnifier(point)
    }
  }

  drawMagnifier({ x, y }) {
    const imgX = x * this.scale,
      imgY = y * this.scale,
      sx = imgX - this.r,
      sy = imgY - this.r

    const dx = x - this.r,
      dy = y - this.r
    this.context.save()

    this.context.strokeStyle = '#069'
    this.context.lineWidth = 4

    this.context.beginPath()
    this.context.arc(x, y, this.r, 0, Math.PI * 2)

    this.context.stroke()
    this.context.clip()

    this.context.drawImage(
      this.offCanvas,
      sx,
      sy,
      2 * this.r,
      2 * this.r,
      dx,
      dy,
      2 * this.r,
      2 * this.r
    )

    this.context.restore()
  }
}
