import React, { useState, useRef, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'
import Image from 'gatsby-image'
import gsap from 'gsap'

import Container from './Layout/Container'
import Title from './Title'
import AnimatedImage from './AnimatedImage'
import MouseImage from './MouseImage'

const Wrapper = styled.div`
    ${props => props.theme.above.desktop`
        perspective: 20px;
    `}
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: calc(${props => props.theme.sizes.mobile} * 5) ${props => props.theme.sizes.mobile} calc(${props => props.theme.sizes.mobile} * 6);

    ${props => props.theme.above.desktop`
        flex-direction: row;
        
        padding: calc(${props.theme.sizes.desktop} * 10) 0;
    `}
`

const Content = styled(Title)`
    .description {
        font-size: ${props => props.theme.fontSizes.mobile.p};
        line-height: 1.3;
    }

    ${props => props.theme.above.desktop`
        .description-wrapper {
            max-width: ${props.theme.desktopVW(480)};
        }

        .description {
            font-size: ${props.theme.fontSizes.desktop.h6};
        }
    `}
`

const MouseAnimatedWrapper = styled.div`
    width: ${props => props.theme.mobileVW(500)};
    height: ${props => props.theme.mobileVW(500)};
    
    perspective: 10px;
    
    overflow: hidden;

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(850)};
        height: ${props.theme.desktopVW(850)};
    `}
`
  
const MouseAnimatedImage = styled.div`
    background-repeat: no-repeat;
    background-position: center;
`

const MouseAnimatedBorder = styled.div`
    position: absolute;
    
    top: -${props => props.theme.desktopVW(300)};
    left: -${props => props.theme.desktopVW(300)};
    
    z-index: 12;
    
    width: calc(100% + ${props => props.theme.desktopVW(300)});
    height: calc(100% + ${props => props.theme.desktopVW(300)});
    
    margin: ${props => props.theme.desktopVW(150)};
    
    background-color: transparent;
    border: ${props => props.theme.desktopVW(300)} solid ${props => props.theme.colors.dark};
    
    overflow: hidden;
    
    transition: transform 0.5s ease-out 0s;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`  

const JoinUs = ({
    lang,
    inView,
    data: {
        contentTitle,
        contentDescription,
        image
    }
}) => {

    // Refs
    const mainRef = useRef(null)
    const titleRef = useRef(null)
    const imageWrapperRef = useRef(null)
    const imageRef = useRef(null)

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
        // imageWrapperRef.current.style.background = 'radial-gradient(at ' + (-80 + mouse.x / -5 % 100) + '% -50%, #fff, transparent 60%)'
        updateTransformStyle(
        (mouse.y / mainRef.current.offsetHeight / -2).toFixed(2),
        (mouse.x / mainRef.current.offsetWidth / -2).toFixed(2)
        )
    }
    
    const updateTransformStyle = (x, y) => {
        const style = 'rotateX(' + Math.min(Math.max(x, -0.20), 0.20) + 'deg) rotateY(' + Math.min(Math.max(y, -0.20), 0.20) + 'deg)'
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

    useEffect(() => {

        gsap.set(imageRef.current, { alpha: 0.0 })
        
        if (!inView) return

        const timeline = new gsap.timeline()
        
        timeline.add(titleRef.current.transitionIn(), 0.0)
        timeline.to(imageRef.current, { alpha: 1.0, duration: 0.35, ease: 'sine.out' }, 0.25)

    }, [inView])

    return (
        <Wrapper ref={mainRef}>
            <StyledContainer>
                <Content
                    lang={lang}
                    title={contentTitle}
                    description={contentDescription}
                    size='medium'
                    ref={titleRef}
                />
                <MouseAnimatedWrapper ref={imageRef}>
                    <MouseAnimatedImage
                        style={{
                            backgroundImage: `url(${image.fluid.src})`,
                            height: '100%'
                        }}
                    >
                    </MouseAnimatedImage>
                    <MouseAnimatedBorder
                        ref={imageWrapperRef}
                    >
                    </MouseAnimatedBorder>
                </MouseAnimatedWrapper>
            </StyledContainer>
        </Wrapper>
    )
}

export default JoinUs
