import React, { useEffect, useRef } from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import gsap from 'gsap'

import Container from './Layout/Container'
import Title from './Title'
import Locations from './Locations'

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

    top: 0;
    right: 0;

    /* width: ${props => props.theme.mobileVW(188)}; */
    width: 100%;
    height: 100%;

    background-color: ${props => props.theme.colors.darkGrey};

    overflow: hidden;

    opacity: 0.25;

    ${props => props.theme.above.desktop`
        top: 0;
        
        transform: none;
        
        width: 50vw;
        height: 100%;

        opacity: 1;
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

const NormalBanner = ({
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
        externalLinkLabel,
        contact
    }
}) => {
    
    // Refs
    const imageOverlayRef = useRef(null)
    const imageRef = useRef(null)
    const titleRef = useRef(null)

    const titleSize = (bannerType == 'Home') ? 'extra-large' : (bannerType == 'Page') ? 'large' : 'small'

    useEffect(() => {

        const timeline = new gsap.timeline({ delay: delay })

        timeline.add(titleRef.current.transitionIn(), 0)
        timeline.fromTo(imageOverlayRef.current, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 1, ease: 'power3.out' }, 0.6)
        timeline.fromTo(imageRef.current, { scale: 1.75 }, { scale: 1, duration: 1, ease: 'power3.out' }, 0.6)
        
        return () => {
            timeline && timeline.kill()
        }

    }, [])

    return (
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
                        ref={titleRef}
                    />
                    {contact && (
                        <Locations lang={lang} inView={inView} data={contact}/>
                    )}
                </Content>
            </Container>
        </>
    )
}

export default NormalBanner
