import React, { useEffect, useRef } from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import gsap from 'gsap'

import Container from './Layout/Container'
import Title from './Title'
import TextRenderer from './TextRenderer'
import Testimonial from './Testimonial'
import HomeBanner from './HomeBanner'
import Locations from './Locations'

const StyledHeroBanner = styled.div`
    position: relative;

    width: 100%;
    
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    max-height: 2000px;
`

const Content = styled.div`
    position: absolute;
    
    top: 50%;

    transform: translateY(-50%);

    ${props => props.theme.below.desktop`
        left: 0;
        
        width: 100%;

        padding: 0 ${props.theme.sizes.mobile};
    `}
`

const StyledTitle = styled(Title)`
    ${props => props.theme.below.desktop`
        .description {
            font-size: ${props.theme.fontSizes.mobile.s};
        }

        .testimonials {
            display: none;
        }
    `}
`

const ImageWrapper = styled.div`
    position: absolute;

    // top: 50%;
    top: 0;
    right: 0;

    // transform: translateY(-50%);

    width: ${props => props.theme.mobileVW(188)};
    // height: ${props => props.theme.mobileVW(432)};
    height: 100%;

    background-color: ${props => props.theme.colors.darkGrey};

    overflow: hidden;

    ${props => props.theme.above.desktop`
        top: 0;
        
        transform: none;
        
        width: 50vw;
        height: 100%;
    `}
`

const AnimatedImage = styled.div`
    width: 100%;
    height: 100%;
`

const ImageOverlay = styled.div`
    ${props => props.theme.styles.element.fill}

    background-color: ${props => props.theme.colors.dark};
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const HeroBanner = ({
    lang,
    inView,
    className,
    category,
    data
}) => {

    const {
        bannerType,
        tags,
        images,
        headerTitle,
        headerDescription,
        testimonial,
        internalLinks,
        externalLink,
        externalLinkLabel,
        contact
    } = data
    
    const bannerRef = useRef(null)
    const imageOverlayRef = useRef(null)
    const imageRef = useRef(null)

    const titleSize = (bannerType == 'Home') ? 'extra-large' : (bannerType == 'Page') ? 'large' : 'small'

    useEffect(() => {
        let vh = window.innerHeight * 0.01
        bannerRef.current.style.setProperty('--vh', `${vh}px`)
    }, [])

    const transitionIn = () => {
        const timeline = new gsap.timeline()
        timeline.fromTo(imageOverlayRef.current, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 2, ease: 'power3.out' }, 0)
        timeline.fromTo(imageRef.current, { scale: 1.5 }, { scale: 1, duration: 2, ease: 'power3.out' }, 0)
    }

    return (
        <StyledHeroBanner className={className} type={bannerType} ref={bannerRef}>
            {bannerType != 'Home' ? (
                <>
                    {images && (
                        <ImageWrapper>
                            <AnimatedImage ref={imageRef}>
                                {images.map(({ fluid, title }, i) => (
                                    <StyledImage key={i} fluid={fluid} alt={title} />
                                ))}
                            </AnimatedImage>
                            <ImageOverlay ref={imageOverlayRef} />
                        </ImageWrapper>
                    )}
                    <Container>
                        <Content>
                            <StyledTitle
                                lang={lang}
                                size={titleSize}
                                tags={tags}
                                title={headerTitle}
                                description={headerDescription}
                                testimonial={testimonial}
                                category={category}
                                links={internalLinks || externalLink && {
                                    internal: internalLinks,
                                    external: {
                                        link: externalLink,
                                        label: externalLinkLabel
                                    }
                                }}
                            />
                            {contact && (
                                <Locations lang={lang} inView={inView} data={contact}/>
                            )}
                        </Content>
                    </Container>
                </>
            ) : <HomeBanner inView={inView} lang={lang} className={className} data={data} category={category} />}
        </StyledHeroBanner>
    )
}

export default HeroBanner
