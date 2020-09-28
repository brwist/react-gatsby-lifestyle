import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import Image from 'gatsby-image'
import gsap from 'gsap'
import styled from 'styled-components'
import { useWindowSize } from 'react-use'

const Wrapper = styled.div`
    position: relative;

    /* width: 100%;

    margin-bottom: ${props => props.theme.sizes.mobile};
    padding-bottom: 114%; */

    transition: transform 0.25s ease-out;

    overflow: hidden;

    &:hover {
        .image {
            img {
                transform: scale(1.1);
            }
        }
    }

    /* ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.desktopVW(40)};
    `} */
`

const Animated = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`

const Overlay = styled.div`
    position: absolute;
    
    top: -10px;
    left: -10px;

    width: calc(100% + 20px);
    height: calc(100% + 20px);

    ${props => props.overlayColor == 'White' ? `
        background-color: ${props.theme.colors.white};
    ` : props.overlayColor == 'Grey' ? `    
        background-color: ${props.theme.colors.light};
    ` : `
        background-color: ${props.theme.colors.dark};
    `}
`

const StyledImage = styled(Image)`
    position: absolute !important;
    
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;

    object-fit: cover;

    img {
        transition: transform 0.25s ease-out !important;
        opacity: 1 !important;
    }
`

const AnimatedImage = ({ 
    className,
    overlayColor,
    data: image,
    animation
}, ref) => {

    // Refs
    const imageRef = useRef(null)
    const imageOverlayRef = useRef(null)

    // Window Size
    const { width: windowWidth } = useWindowSize()

    // Animation
    const duration = animation && animation.duration || 0.65
    const delay = animation && animation.delay || 0.5

    const mobileAnimation = () => {

        gsap.set(imageOverlayRef.current, { scaleY: 0.0 })
        gsap.set(imageRef.current, { y: 25.0, alpha: 0.0 })

        const timeline = new gsap.timeline({ delay: delay })
        
        timeline.to(imageRef.current, { y: 0.0, alpha: 1.0, duration: duration, ease: 'power3.out' }, 0.0)
        
        return timeline

    }

    const desktopAnimation = () => {

        gsap.set(imageOverlayRef.current, { scaleY: 1.0 })
        gsap.set(imageRef.current, { scale: 1.75, alpha: 0.0 })

        const timeline = new gsap.timeline({ delay: delay })
        
        timeline.to(imageOverlayRef.current, { scaleY: 0.0, transformOrigin: 'top', duration: duration, ease: 'sine.out' }, 0.0)
        timeline.to(imageRef.current, { scale: 1.0, alpha: 1.0, duration: duration, ease: 'power3.out' }, 0.0)
        
        return timeline

    }

    useImperativeHandle(ref, () => {

        return {
            transitionIn() {

                return windowWidth <= 1023 ? mobileAnimation() : desktopAnimation()

            },
            zoomIn() {

                gsap.to(imageRef.current, { scale: 1.1, duration: 2.5 })

            }
        }
    })

    return (
        <Wrapper className={className}>
            <Animated ref={imageRef}>
                <StyledImage fluid={image.fluid} alt={image.alt} />
            </Animated>
            <Overlay ref={imageOverlayRef} overlayColor={overlayColor} />
        </Wrapper>
    )
}

export default forwardRef(AnimatedImage)
