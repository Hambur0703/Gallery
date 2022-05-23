import { useLayoutEffect, useRef } from 'react'
import { Magnifier } from './Magnifier'

const MagnifierComponent = ({ url, width = 400, height = 400 }) => {
  const canvasRef = useRef()
  const offCanvasRef = useRef()

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const offCanvas = offCanvasRef.current

    new Magnifier({
      canvas,
      offCanvas,
      imgUrl: url,
      width,
      height,
    })
  }, [])

  return (
    <>
      <canvas ref={canvasRef}>您的浏览器尚不支持canvas</canvas>
      <canvas style={{ display: 'none' }} ref={offCanvasRef}></canvas>
    </>
  )
}

export default MagnifierComponent
