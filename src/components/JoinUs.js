import React, { useState, useRef, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'
import Image from 'gatsby-image'
import gsap from 'gsap'

import Container from './Layout/Container'
import Title from './Title'
import AnimatedImage from './AnimatedImage'

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
        margin-right: calc(${props.theme.sizes.desktop} * 4);
        
        .description-wrapper {
            max-width: ${props.theme.desktopVW(480)};
        }

        .description {
            font-size: ${props.theme.fontSizes.desktop.h6};
        }
    `}
`

const ImageWrapper = styled.div`
    position: relative;

    width: ${props => props.theme.mobileVW(500)};
    height: ${props => props.theme.mobileVW(500)};

    background-color: ${props => props.theme.colors.darkGrey};

    transition: transform 0.5s ease-out;

    ${props => props.theme.below.desktop`
        position: absolute;

        top: 0;
        left: 0;

        z-index: -1;

        width: 100%;
        height: 100%;

        opacity: 0.25;
    `}

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(500)};
        height: ${props.theme.desktopVW(500)};

        /* box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5); */
    `}
`

const StyledAnimatedImage = styled(AnimatedImage)`
    width: 100%;
    height: 100%;
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

    useEffect(() => {
        
        if (!inView) return

        const timeline = new gsap.timeline()
        
        timeline.add(titleRef.current.transitionIn(), 0)
        timeline.add(imageRef.current.transitionIn(), 0)

    }, [inView])

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
        updateTransformStyle(
            (mouse.y / mainRef.current.offsetHeight / 2).toFixed(2),
            (mouse.x / mainRef.current.offsetWidth / 2).toFixed(2)
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
        <Wrapper ref={mainRef}>
            <StyledContainer>
                <Content
                    lang={lang}
                    title={contentTitle}
                    description={contentDescription}
                    size='medium'
                    ref={titleRef}
                />
                <ImageWrapper ref={imageWrapperRef}>
                    <StyledAnimatedImage
                        ref={imageRef} 
                        data={image} 
                    />
                </ImageWrapper>
            </StyledContainer>
        </Wrapper>
    )
}

export default JoinUs
