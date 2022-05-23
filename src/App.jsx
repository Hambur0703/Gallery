import { useEffect, useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import MagnifierImage from './Magnifier/index.jsx'
import image1 from './imgs/img1.jpg'
import image2 from './imgs/img2.jpg'
import image3 from './imgs/img3.jpg'
import image4 from './imgs/img4.jpg'
import image5 from './imgs/img5.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './app.less'

const imgs = [
  { id: 1, url: image1 },
  { id: 2, url: image2 },
  { id: 3, url: image3 },
  { id: 4, url: image4 },
  { id: 5, url: image5 }
]

function App() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleWidth = () => {
      // Get the width of the entire webpage
      setWidth(document.body.scrollWidth)
    }
    handleWidth()

    window.addEventListener('resize', handleWidth)

    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])

  const isBig = useMemo(() => width > 992, [width])

  return (
    <div className='app'>
      <div className='imgs-wrapper'>
        <Carousel
          infiniteLoop
          autoPlay
          emulateTouch={!isBig}
          showArrows={false}
          showIndicators={!isBig}
          width={800}
          renderArrowPrev={onClick => {
            return isBig ? (
              <div className='pre-arrow' onClick={onClick}>
                <AiFillCaretLeft />
              </div>
            ) : null
          }}
          renderArrowNext={onClick => {
            return isBig ? (
              <div className='next-arrow' onClick={onClick}>
                <AiFillCaretRight />
              </div>
            ) : null
          }}
          renderThumbs={children => {
            return isBig
              ? children.map(v => (
                  <div key={v.key}>
                    <img src={v.props.url} />
                  </div>
                ))
              : null
          }}
        >
          {imgs.map(v =>
            isBig ? (
              <MagnifierImage width={800} height={500} key={v.id} url={v.url} />
            ) : (
              <img key={v.id} src={v.url} />
            )
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default App
