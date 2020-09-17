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
                width: ${props.theme.desktopVW(500)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(560)};
            }
        }

        &:nth-of-type(3) {
            margin-top: -${props.theme.desktopVW(100)};

            .inner {
                width: ${props.theme.desktopVW(550)};
            }
        }

        &:nth-of-type(4) {
            margin-top: ${props.theme.desktopVW(200)};
            margin-bottom: calc(${props.theme.sizes.desktop} * 5);

            .inner {
                width: ${props.theme.desktopVW(750)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(640)};
            }
        }

        &:hover {
            img {
                transform: scale(1.05);
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

    img {
        transition: transform 5.0s ease-out !important;
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

const Description = styled.div``

const Category = styled.span`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    opacity: 0.5;
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 3);

        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const Name = styled.h4`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.h5};
    line-height: 1.3;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 2);
      
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const UpcomingItem = ({
    lang,
    overlayColor,
    data: {
        name,
        title,
        slug, 
        category,
        featuredImage
    }
}) => {

    const { width: windowWidth } = useWindowSize()

    const imageRef = useRef(null)
    const descriptionRef = useRef(null)
    const buttonRef = useRef(null)

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true
    })

    useEffect(() => {

        gsap.set(descriptionRef.current, { alpha: 0.0, y: -10.0 })

        if (!inView) return

        const timeline = new gsap.timeline()

        timeline.add(imageRef.current.transitionIn(), 0.2)
        timeline.to(descriptionRef.current, { alpha: 1.0, y: 0.0, duration: 0.35, ease: 'power1.out' }, 1.0)

        return () => {
            timeline && timeline.kill()
        }

    }, [inView])
    
    return (
        <StyledItem ref={ref}>
            <Inner 
                className='inner'
                onMouseEnter={() => buttonRef.current.classList.add('hover')} 
                onMouseLeave={() => buttonRef.current.classList.remove('hover')}
            >
                <ImageWrapper to={generatePath(lang, `events-and-trips/${category.toLowerCase()}/${slug}`)}>
                    <StyledAnimatedImage 
                        ref={imageRef} 
                        data={featuredImage} 
                        overlayColor={overlayColor} 
                    />
                </ImageWrapper>
                <Description ref={descriptionRef}>
                    <Category>{category}</Category>
                    <Name>{title}</Name>
                    <ButtonArrow 
                        ref={buttonRef}
                        label='Read more' 
                        to={generatePath(lang, `${category.toLowerCase()}/${slug}`)}
                    />
                </Description>
            </Inner>
        </StyledItem>
    )
}

export default UpcomingItem