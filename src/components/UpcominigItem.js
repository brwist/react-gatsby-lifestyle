import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import Img from 'gatsby-image'
import gsap from 'gsap'
import { useWindowSize } from 'react-use'

import theme from './../styles/theme'

import ButtonArrow from './Buttons/ButtonArrow'
import AnimatedImage from './AnimatedImage'

import { generatePath } from '../utils/helpers'
import { Link } from 'gatsby'

const StyledItem = styled.li`
    width: 100%;

    ${props => props.theme.above.desktop`
        width: 50%;

        &:nth-of-type(2),
        &:nth-of-type(3) {
            margin-top: ${props.theme.desktopVW(500)};

            .inner {
                width: ${props.theme.desktopVW(450)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(560)};
            }
        }

        &:nth-of-type(3) {
            margin-top: -${props.theme.desktopVW(100)};

            .inner {
                width: ${props.theme.desktopVW(500)};
            }
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
    display: block;

    width: 100%;
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(560)};
    `}
`

const ImageWrapper = styled(Link)``

const StyledAnimatedImage = styled(AnimatedImage)`
    width: 100%;

    &:hover {
        img {
            transform: scale(1.1);
        }
    }

    ${props => props.theme.below.desktop`
        margin-bottom: calc(${props.theme.sizes.mobile} / 2);
        padding-bottom: 145.34%;
    `}

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(640)};

        margin-bottom: ${props.theme.sizes.desktop};
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
    overlayColor,
    data: {
        name,
        slug, 
        category,
        featuredImage
    }
}) => {

    const { width: windowWidth } = useWindowSize()

    const imageRef = useRef(null)
    const imageOverlayRef = useRef(null)
    const nameRef = useRef(null)
    const infoRef = useRef(null)

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true
    })

    useEffect(() => {

        gsap.set(nameRef.current, { alpha: 0.0 })
        gsap.set(infoRef.current, { alpha: 0.0 })

        if (!inView) return

        const timeline = new gsap.timeline()

        timeline.add(imageRef.current.transitionIn(), 0.2)
        timeline.to(nameRef.current, { alpha: 1.0, duration: 0.35, ease: 'power1.out' }, 0.55)
        timeline.to(infoRef.current, { alpha: 1.0, duration: 0.35, ease: 'power1.out' }, 0.55)

        return () => {
            timeline && timeline.kill()
        }

    }, [inView])
    
    return (
        <StyledItem ref={ref}>
            <Inner className='inner'>
                <ImageWrapper to={generatePath(lang, `${category.toLowerCase()}/${slug}`)}>
                    <StyledAnimatedImage 
                        ref={imageRef} 
                        data={featuredImage} 
                        overlayColor={overlayColor} 
                    />
                </ImageWrapper>
                <Name ref={nameRef}>{name}</Name>
                <Info ref={infoRef}>
                    <ButtonArrow 
                        label='Read more' 
                        to={generatePath(lang, `${category.toLowerCase()}/${slug}`)}
                    />
                    <Category>{category}</Category>
                </Info>
            </Inner>
        </StyledItem>
    )
}

export default UpcomingItem