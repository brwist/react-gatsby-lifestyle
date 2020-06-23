import React, { useImperativeHandle, forwardRef, useEffect, useContext, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import Img from 'gatsby-image'
import gsap, { timeline } from 'gsap'

import Title from './Title'
import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'

import { generatePath } from '../utils/helpers'

const StyledItem = styled.li`
    width: 100%;

    ${props => props.theme.above.desktop`
        width: 50%;

        &:nth-of-type(2),
        &:nth-of-type(3) {
            margin-top: ${props.theme.desktopVW(500)};

            .inner {
                width: ${props.theme.desktopVW(400)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(560)};
            }
        }

        &:nth-of-type(3) {
            margin-top: -${props.theme.desktopVW(100)};
        }

        &:nth-of-type(4) {
            margin-top: ${props.theme.desktopVW(200)};
            margin-bottom: calc(${props.theme.sizes.desktop} * 5);

            .inner {
                width: ${props.theme.desktopVW(720)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(640)};
            }
        }
    `}
`

const Inner = styled.div`
    width: 100%;
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(560)};
    `}
`

const ImageWrapper = styled.div`
    display: block;

    position: relative;

    width: 100%;

    overflow: hidden;

    ${props => props.theme.below.desktop`
        margin-bottom: calc(${props.theme.sizes.mobile} / 2);
        padding-bottom: 145.34%;
    `}

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(640)};

        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const AnimatedImage = styled.div`
    width: 100%;
    height: 100%;
`

const ImageOverlay = styled.div`
    ${props => props.theme.styles.element.fill};

    background-color: ${props => props.color};
`

const StyledImage = styled(Img)`
    ${props => props.theme.styles.image.objectCover};

    ${props => props.theme.below.desktop`
        position: absolute !important;

        top: 0;
        left: 0;
    `}
`

const Name = styled.h4`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 2);

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.h6};
    line-height: 1.2;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props => props.theme.sizes.desktop};
        
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Info = styled.div`
    ${props => props.theme.styles.flexBox.horCen};
`

const Category = styled.span`
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.xs};
    line-height: 1.5;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const UpcomingItem = ({
    lang,
    color,
    data: {
        name,
        slug, 
        category,
        featuredImage
    }
}) => {

    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true
    })

    const imageRef = useRef(null)
    const imageOverlayRef = useRef(null)
    const nameRef = useRef(null)
    const infoRef = useRef(null)

    useEffect(() => {

        if (!inView) return

        const timeline = new gsap.timeline()
                
        timeline.fromTo(imageOverlayRef.current, { height: '100%' }, { height: 0.0, transformOrigin: 'bottom', duration: 0.75, ease: 'sine.inOut' }, 0)
        timeline.from(imageRef.current, { alpha: 0.0, scale: 1.2, duration: 0.75, ease: 'sine.inOut' }, 0.2)
        timeline.fromTo(nameRef.current, { alpha: 0.0, y: -50 }, { alpha: 1.0, y: 0, duration: 0.35, ease: 'power1.out' }, 0.2)
        timeline.fromTo(infoRef.current, { alpha: 0.0 }, { alpha: 1.0, duration: 0.5, ease: 'power1.out' }, 0.5)

        return () => {
            timeline && timeline.kill()
        }

    }, [inView])

    return (
        <StyledItem ref={ref}>
            <Inner className='inner'>
                <ImageWrapper className='image-wrapper'>
                    <AnimatedImage ref={imageRef}>
                        {featuredImage && <StyledImage fluid={featuredImage.fluid} alt={featuredImage.title} objectFit='cover'/>}
                    </AnimatedImage>
                    <ImageOverlay ref={imageOverlayRef} color={color}/>
                </ImageWrapper>
                <Name ref={nameRef}>{name}</Name>
                <Info ref={infoRef}>
                    <ButtonArrow label='Read more' to={generatePath(lang, `${category.toLowerCase()}/${slug}`)}/>
                    <Category>{category}</Category>
                </Info>
            </Inner>
        </StyledItem>
    )
}

export default UpcomingItem