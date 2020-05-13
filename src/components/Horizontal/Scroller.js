import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import stickybits from 'stickybits'

const TallOuterContainer = styled.div.attrs(({ dynamicHeight }) => ({
    style: { 
        height: `${dynamicHeight}px` 
    }
}))`
    position: relative;
    width: 100%;
`

const StickyInnerContainer = styled.div`
    position: sticky;
    
    top: 0;
    
    width: 100%;
    height: 100vh;
    
    overflow-x: hidden;
`

const HorizontalTranslateContainer = styled.div.attrs(({ translateX }) => ({
    style: { 
        transform: `translateX(${translateX}px)` 
    }
}))`
    position: absolute;
    height: 100%;
    will-change: transform;
`

const calcDynamicHeight = objectWidth => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return objectWidth - vw + vh + 150
}

const handleDynamicHeight = (ref, setDynamicHeight) => {
    const objectWidth = ref.current.scrollWidth
    const dynamicHeight = calcDynamicHeight(objectWidth)
    setDynamicHeight(dynamicHeight)
}

const Scroller = ({ lang, title, description, children }) => {

    const [dynamicHeight, setDynamicHeight] = useState(null)
    const [translateX, setTranslateX] = useState(0)
    const [sticky, setSticky] = useState(false)

    const containerRef = useRef(null)
    const objectRef = useRef(null)

    const resizeHandler = () => {
        handleDynamicHeight(objectRef, setDynamicHeight)
    }

    const scrollHandler = () => {
        setSticky(containerRef.current.offsetTop > 0)
        const offsetTop = -containerRef.current.offsetTop
        setTranslateX(offsetTop)
    }

    useEffect(() => {

        handleDynamicHeight(objectRef, setDynamicHeight)
        stickybits(containerRef.current)

        window.addEventListener('resize', resizeHandler)
        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <TallOuterContainer dynamicHeight={dynamicHeight}>
            <StickyInnerContainer ref={containerRef}>
                <HorizontalTranslateContainer translateX={translateX} ref={objectRef}>
                    {children}
                </HorizontalTranslateContainer>
            </StickyInnerContainer>
        </TallOuterContainer>
    )
}

export default Scroller