import React, { useRef, useEffect } from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import gsap from 'gsap'

import Container from './Layout/Container'
import Title from './Title'

const StyledHeroBanner = styled.div`
    position: relative;

    width: 100%;
    
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    max-height: 2000px;
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    ${props => props.theme.below.desktop`
        display: none;
    `}
    
    ${props => props.theme.above.desktop`
        justify-content: center;
        align-items: center;

        pointer-events: none;
    `}
`

const TitleWrapper = styled.div``

const StyledTitle = styled(Title)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    ${props => props.theme.above.desktop`
        justify-content: center;
    `}
`

const StyledDescription = styled(Title)`
    ${props => props.theme.above.desktop`
        .description-wrapper {
            max-width: ${props.theme.desktopVW(480)};

            margin-left: 0;
        }
    `}
`

const AnimatedImage = styled.div`
    width: 100%;
    height: 100%;

    overflow: hidden;
`

const ImageLeftWrapper = styled.div`
    ${props => props.theme.below.desktop`
        display: none;
    `}

    ${props => props.theme.above.desktop`
        position: absolute;
        
        top: 55%;
        left: 12%;

        transform: translateY(-50%);
    `}
`

const ImageLeft = styled.div`
    width: ${props => props.theme.mobileVW(129)};
    height: ${props => props.theme.mobileVW(240)};

    background-color: ${props => props.theme.colors.darkGrey};

    overflow: hidden;

    ${props => props.theme.below.desktop`
        display: none;
    `}

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(480)};
        height: ${props.theme.desktopVW(600)};

        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const ImageRight = styled.div`
    position: absolute;

    top: 50%;
    right: 0;

    transform: translateY(-50%);

    width: ${props => props.theme.mobileVW(188)};
    height: ${props => props.theme.mobileVW(432)};

    background-color: ${props => props.theme.colors.darkGrey};

    overflow: hidden;

    ${props => props.theme.below.desktop`
        top: 0;
        left: 0;
        bottom: 0;
        
        transform: none;

        width: 100%;
        height: 100%;

        opacity: 0.25;
    `}

    ${props => props.theme.above.desktop`
        top: 0;
        
        transform: none;
        
        width: 50vw;
        height: 100%;
    `}
`

const ImageOverlay = styled.div`
    ${props => props.theme.styles.element.fill}

    background-color: ${props => props.theme.colors.dark};
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const MobileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    position: absolute;
    
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;

    padding: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        display: none;
    `}
`

const HomeBanner = ({
    lang,
    inView,
    className,
    category,
    delay,
    data: {
        bannerType,
        tags,
        images,
        headerTitle,
        headerDescription,
        testimonial,
        internalLinks,
        externalLink,
        externalLinkLabel
    }
}) => {

    // Refs
    const bannerRef = useRef(null)
    const imageLeftRef = useRef(null)
    const imageLeftOverlayRef = useRef(null)
    const imageRightRef = useRef(null)
    const imageRightOverlayRef = useRef(null)
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const titleMobileRef = useRef(null)
    const descriptionMobileRef = useRef(null)

    useEffect(() => {

        let vh = typeof window !== 'undefined' ? window.innerHeight * 0.01 : 1000
        bannerRef.current.style.setProperty('--vh', `${vh}px`)
        
    }, [])

    useEffect(() => {

        const timeline = new gsap.timeline({ delay: delay })
        
        timeline.add(titleRef.current.transitionIn(), 0)
        timeline.add(descriptionRef.current.transitionIn(), 0)
        timeline.add(titleMobileRef.current.transitionIn(), 0)
        timeline.add(descriptionMobileRef.current.transitionIn(), 0)
        timeline.fromTo([imageLeftOverlayRef.current, imageRightOverlayRef.current], { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 1, ease: 'power3.out' }, 1.25)
        timeline.fromTo(imageLeftRef.current, { scale: 1.75 }, { scale: 1.2, duration: 1, ease: 'power3.out' }, 1.25)
        timeline.fromTo(imageRightRef.current, { scale: 1.75 }, { scale: 1.15, duration: 1, ease: 'power3.out' }, 1.25)

        return () => {
            timeline && timeline.kill()
        }
        
    }, [])

    const mousemoveHandler = e => {

        const x = ((window.innerWidth / 2) - e.pageX) / 20
        const y = ((window.innerHeight / 2)- e.pageY) / 20
        
        gsap.to(imageLeftRef.current, { x: -x, y: -y, duration: 3.5 })
        gsap.to(imageRightRef.current, { x: x, y: y, duration: 3.5 })
        
    }

    useEffect(() => {
        bannerRef.current.addEventListener('mousemove', mousemoveHandler)

        return () => {
            bannerRef.current.removeEventListener('mousemove', mousemoveHandler)
        }
    }, [])

    return (
        <StyledHeroBanner 
            ref={bannerRef}
            className={className} 
            type={bannerType}
        >
            <ImageLeftWrapper>
                <ImageLeft>
                    <AnimatedImage ref={imageLeftRef}>
                        <StyledImage fluid={images[0].fluid} alt={images[0].title} />
                    </AnimatedImage>
                    <ImageOverlay ref={imageLeftOverlayRef} />
                </ImageLeft>
                <StyledDescription 
                    lang={lang}
                    ref={descriptionRef}
                    size='extra-large'
                    description={headerDescription}
                    links={internalLinks || externalLink && {
                        internal: internalLinks,
                        external: {
                            link: externalLink,
                            label: externalLinkLabel
                        }
                    }}
                />
            </ImageLeftWrapper>
            <ImageRight>
                <AnimatedImage ref={imageRightRef}>
                    <StyledImage fluid={images[1].fluid} alt={images[1].title} />
                </AnimatedImage>
                <ImageOverlay ref={imageRightOverlayRef} />
            </ImageRight>
            <StyledContainer>
                <TitleWrapper>
                    <StyledTitle
                        ref={titleRef}
                        lang={lang}
                        size='extra-large'
                        title={headerTitle}
                        category={category}
                    />
                </TitleWrapper>
            </StyledContainer>
            <MobileWrapper>
                <Title
                    ref={titleMobileRef}
                    lang={lang}
                    size='medium'
                    title={headerTitle}
                    category={category}
                />
                <Title 
                    lang={lang}
                    ref={descriptionMobileRef}
                    size='normal'
                    description={headerDescription}
                    links={internalLinks || externalLink && {
                        internal: internalLinks,
                        external: {
                            link: externalLink,
                            label: externalLinkLabel
                        }
                    }}
                />
            </MobileWrapper>
        </StyledHeroBanner>
    )
}

export default HomeBanner
