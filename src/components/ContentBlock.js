import React, { useRef, useEffect } from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import gsap from 'gsap'
import stickybits from 'stickybits'

import Container from './Layout/Container'
import Title from './Title'
import Video from './Video'
import Carousel from './Carousel'
import TextRenderer from './TextRenderer'

const Wrapper = styled(Container)`
    position: relative;

    padding-top: ${props => props.theme.sizes.mobile};
    padding-bottom: calc(${props => props.theme.sizes.mobile} * 5);

    ${props => props.theme.above.desktop`
        /* height: 300vh;
        height: 100vh; */

        padding-top: calc(${props.theme.sizes.desktop} * 10);
        padding-bottom: calc(${props.theme.sizes.desktop} * 10);
    `}
`

const Inner = styled.div`
    position: relative;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;

    position: relative;

    ${props => props.theme.above.desktop`
        flex-direction: ${props.type == 'Media Left' ? 'row' : 'row-reverse'};
        justify-content: space-around;
        align-items: center;

        /* height: 100vh; */
    `}
`

const Media = styled.div`
    position: relative;
    
    width: 100%;
    height: auto;

    margin-bottom: calc(${props => props.theme.sizes.mobile} * 1.5);

    background-color: ${props => props.theme.colors.dark};

    overflow: hidden;

    .swiper-scrollbar {
        left: 50%;
        bottom: calc(${props => props.theme.sizes.mobile} / 2);

        transform: translateX(-50%);

        height: 3px;
        width: ${props => props.theme.mobileVW(75)};
        
        background-color: rgba(255, 255, 255, 0.1);

        .swiper-scrollbar-drag {
            background-color: ${props => props.theme.colors.white};
        }
    }
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(720)};
        height: ${props.theme.desktopVW(720)};

        margin-bottom: 0;

        .swiper-scrollbar {
            bottom: calc(${props.theme.sizes.desktop} * 2);

            width: ${props.theme.desktopVW(160)};
        }
    `}
`

const AnimatedMedia = styled.div`
    width: 100%;
    height: 100%;
`

const MediaOverlay = styled.div`
    ${props => props.theme.styles.element.fill}

    background-color: ${props => props.theme.colors.dark};
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;

    object-fit: cover;
`

const Content = styled.div`
    padding: 0;

    ${props => props.theme.above.desktop`
        ${props.order == 'left' ? `
            padding: 0 ${props.theme.desktopVW(160)} 0 ${props.theme.desktopVW(80)};
        ` : `
            padding: 0 ${props.theme.desktopVW(80)} 0 ${props.theme.desktopVW(80)};
        `}
    `}
`

const StyledTitle = styled(Title)`
    .title-wrapper {
        margin-left: 0;
    }

    h4 {
        margin-bottom: ${props => props.theme.sizes.mobile};

		font-family: ${props => props.theme.fontFamilies.plainLight};
		font-size: ${props => props.theme.fontSizes.mobile.p};
		line-height: 1.3;
    }
    
    ${props => props.theme.above.desktop`
        h4 {
            margin-bottom: calc(${props.theme.sizes.desktop} / 1.5);

            font-size: ${props.theme.fontSizes.desktop.h6};
        }
    `}
`

const ContentBlock = ({
    lang,
    inView,
    data: {
        flowLine, 
        type,
        contentTitle,
        contentDescription,
        images,
        video
    }
}) => {

    const titleRef = useRef(null)
    const mediaOverlayRef = useRef(null)
    const mediaRef = useRef(null)
    const innerRef = useRef(null)

    const params = {
        slidesPerView: 1,
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        }
    }

    useEffect(() => {

        gsap.set(mediaRef.current, { scale: 1.75, alpha: 0.0 })
        gsap.set(mediaOverlayRef.current, { scaleY: 1.0 })
        
        if (!inView) return

        const timeline = new gsap.timeline()

        timeline.add(titleRef.current.transitionIn(), 0)
        timeline.to(mediaOverlayRef.current, { scaleY: 0.0, transformOrigin: 'top', duration: 0.5, ease: 'power3.out' }, 0)
        timeline.to(mediaRef.current, { scale: 1.0, alpha: 1.0, duration: 0.5, ease: 'power3.out' }, 0)

        return () => {
            timeline && timeline.kill()
        }
    }, [inView])

    // useEffect(() => {
    //     stickybits(innerRef.current, {
    //         verticalPosition: 'top'
    //     })
    // }, [])

    return (
        <Wrapper>
            <Inner ref={innerRef}>
            <ContentWrapper type={type}>
                <Media>
                    <AnimatedMedia ref={mediaRef}>
                        {images && images.length > 1 && (
                            <Carousel params={params}>
                                {images.map((image, i) => (
                                    <StyledImage
                                        key={i}
                                        fluid={image.fluid}
                                        alt={image.title}
                                    />
                                ))}
                            </Carousel>
                        )}
                        {images && images.length == 1 && images.map((image, i) => (
                            <StyledImage
                                key={i}
                                fluid={image.fluid}
                                alt={image.title}
                            />
                        ))}
                        {/* {video && !images && (
                            <Video
                                url={video.videoUrl}
                                placeholder={video.placeholder}
                                inView={inView}
                            />
                        )} */}
                    </AnimatedMedia>
                    <MediaOverlay ref={mediaOverlayRef} />
                </Media>
                <Content order={type == 'Media Left' ? 'right' : 'left'}>
                    <StyledTitle 
                        lang={lang}
                        title={contentTitle}
                        description={contentDescription}
                        size='normal'
                        ref={titleRef}
                    />  
                </Content>
                </ContentWrapper>
            </Inner>
        </Wrapper>
    )
}

export default ContentBlock
