import React, { useState, useRef, useEffect } from 'react'
import { useWindowSize } from 'react-use'

const MouseImage = ({ imgSrc }) => {
  const mainRef = useRef(null)
  const imageWrapperRef = useRef(null)

  // Window Size
  const { width: windowWidth } = useWindowSize()
  
  const [mouse] = useState({
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
        var e = event || window.event
        this.x = e.clientX - this._x
        this.y = (e.clientY - this._y) * -1
    },
    setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2)
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2)
    },
    show: function() {
        return '(' + this.x + ', ' + this.y + ')'
    }
  })

  let counter = 0
  let refreshRate = 10
  
  const isTimeToUpdate = () => {
    return counter++ % refreshRate === 0
  }

  const onMouseEnterHandler = (event) => {
    update(event)
  }

  const onMouseLeaveHandler = () => {
    imageWrapperRef.current.style = ''
  }

  const onMouseMoveHandler = (event) => {
    if (isTimeToUpdate()) {
      update(event)
    }
  }

  const update = (event) => {
    mouse.updatePosition(event)
    imageWrapperRef.current.style.background = 'radial-gradient(at ' + (-80 + mouse.x / -5 % 100) + '% -50%, #fff, transparent 60%)'
    updateTransformStyle(
      (mouse.y / mainRef.current.offsetHeight / -2).toFixed(2),
      (mouse.x / mainRef.current.offsetWidth / -2).toFixed(2)
    )
  }
  
  const updateTransformStyle = (x, y) => {
    const style = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
    imageWrapperRef.current.style.transform = style
  }

  useEffect(() => {
    if (windowWidth < 1023) return

    mouse.setOrigin(mainRef.current)

    mainRef.current.addEventListener('mouseenter', onMouseEnterHandler)
    mainRef.current.addEventListener('mousemove', onMouseMoveHandler)
    mainRef.current.addEventListener('mouseleave', onMouseLeaveHandler)

    return () => {
      mainRef.current.removeEventListener('mouseenter', onMouseEnterHandler)
      mainRef.current.removeEventListener('mousemove', onMouseMoveHandler)
      mainRef.current.removeEventListener('mouseleave', onMouseLeaveHandler)
    }
  }, [])

  return (
    <div
      className="animated-wrapper"
      ref={mainRef}
    >
      <div
        className="animated-image"
        style={{
          backgroundImage: `url(${imgSrc})`,
          height: '100%'
        }}
      >
      </div>
      <div
        className="animated-rotate"
        ref={imageWrapperRef}
      >
      </div>
    </div>
  )
}

export default MouseImage
