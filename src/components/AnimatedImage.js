import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import Image from 'gatsby-image'
import gsap from 'gsap'
import styled from 'styled-components'

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
        transition: transform 1.0s ease-out !important;
        opacity: 1 !important;
    }
`

const AnimatedImage = ({ 
    className,
    overlayColor,
    data: image,
    animation
}, ref) => {

    const imageRef = useRef(null)
    const imageOverlayRef = useRef(null)

    useImperativeHandle(ref, () => {

        return {
            transitionIn() {

                const duration = animation ? animation.duration : 1.5

                gsap.set(imageOverlayRef.current, { scaleY: 1.0 })
                gsap.set(imageRef.current, { scale: 1.75, alpha: 0.0 })

                const timeline = new gsap.timeline()
                
                timeline.to(imageOverlayRef.current, { scaleY: 0.0, transformOrigin: 'top', duration: duration, ease: 'sine.out' }, 0.0)
                timeline.to(imageRef.current, { scale: 1.0, alpha: 1.0, duration: duration, ease: 'power3.out' }, 0.0)
                
                return timeline

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