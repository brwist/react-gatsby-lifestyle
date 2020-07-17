import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components'
import Image from 'gatsby-image'
import { Link } from 'gatsby'
import gsap from 'gsap'

import InstagramSvg from './../../images/graphics/instagram.svg'

import TextRenderer from '../TextRenderer'
import ButtonPrimary from './../Buttons/ButtonPrimary'

import { generatePath } from './../../utils/helpers'
import Tags from '../Tags'
import Testimonial from '../Testimonial'

const CardStyles = css`
    position: relative;

    flex-shrink: 0;

    width: ${props => props.theme.mobileVW(450)};

    ${props => props.active == 'false' && `
        &:after {
            content: '';

            ${props.theme.styles.element.fill};

            background-color: ${props.theme.colors.dark};

            opacity: 0.65;
        }
    `}

    ${props => props.type == 'Wave' && `
        &:nth-of-type(odd) {
            margin-top: ${props.theme.desktopVW(100)};
        }

        .image-wrapper {
            box-shadow: 0 0 80px 20px ${props.theme.colors.dark};
        }
    `}

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(450)};

        ${props.active == 'true' && `
            &:hover {
                .button {
                    transform: translateY(0);
                }
            }
        `}
    `}
`

const NormalCard = styled.div`
    ${CardStyles}
`

const LinkedCard = styled(Link)`
    ${CardStyles}
`

const SmallDescription = styled.p`
    position: relative;
    
    font-size: ${props => props.theme.fontSizes.mobile.s};

    ${props => props.theme.above.desktop`
        padding-right: ${props.theme.sizes.desktop};

        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const LargeDescription = styled.div`
    position: relative;
`

const LinkWrapper = styled(Link)`
    display: block;
`

const ImageWrapper = styled.div`
    position: relative;

    width: 100%;

    margin-bottom: ${props => props.theme.sizes.mobile};
    padding-bottom: 114%;

    transition: transform 0.25s ease-out;

    overflow: hidden;

    &:hover {
        .image {
            img {
                transform: scale(1.1);
            }
        }
    }

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.desktopVW(40)};
    `}
`

const AnimatedImage = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`

const ImageOverlay = styled.div`
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
        transition: transform 5.0s ease-out !important;
        opacity: 1 !important;
    }
`

const InstagramIcon = styled(InstagramSvg)`
    position: absolute;

    top: calc(${props => props.theme.sizes.mobile} / 2);
    left: calc(${props => props.theme.sizes.mobile} / 2);
    
    width: ${props => props.theme.mobileVW(15)};
    height: ${props => props.theme.mobileVW(15)};

    ${props => props.theme.above.desktop`
        top: ${props.theme.desktopVW(40)};
        left: ${props.theme.desktopVW(40)};
        
        width: ${props.theme.desktopVW(24)};
        height: ${props.theme.desktopVW(24)};
    `}
`

const Header = styled.div`
    position: relative;

    ${props => props.theme.styles.flexBox.horCen};

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.desktopVW(24)};
    `}
`

const Heading = styled.h4`
    display: block;
    
    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.mobile.h6};
    line-height: 1;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Caption = styled(TextRenderer)`
    b  {
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }

    ${props => props.theme.below.desktop`
        font-size: ${props.theme.fontSizes.mobile.s};
    `}
`

const StyledTestimonial = styled(Testimonial)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        margin-top: ${props.theme.sizes.desktop};
    `}
`

const Title = styled.span`
    font-family: ${props => props.theme.fontFamilies.plainRegular};
`

const ButtonWrapper = styled.div`
    margin-top: calc(${props => props.theme.sizes.mobile} / 1.5);

    opacity: 1;

    overflow: hidden;

    ${props => props.theme.above.desktop`
        margin-top: ${props.theme.sizes.desktop};

        .button {
            transform: translateY(-105%);

            transition: transform 0.15s ease-out;
        }
    `}
`

const ImageComponent = React.forwardRef(({ image, alt, instagram, overlayColor }, ref) => {

    const imageRef = useRef(null)
    const imageOverlayRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            transitionIn() {

                gsap.set(imageRef.current, { scale: 1.75, alpha: 0.0 })
                gsap.set(imageOverlayRef.current, { scaleY: 1.0 })

                const timeline = new gsap.timeline({ delay: 0.5 })
                
                timeline.to(imageOverlayRef.current, { scaleY: 0.0, transformOrigin: 'top', duration: 1.5, ease: 'power3.out' }, 0)
                timeline.to(imageRef.current, { scale: 1.0, alpha: 1.0, duration: 1.5, ease: 'power3.out' }, 0)
                
                return timeline

            }
        }
    })

    return (
        <ImageWrapper className='image-wrapper'>
            <AnimatedImage ref={imageRef}>
                {image != null && (
                    <StyledImage className='image' fluid={image} alt={alt}  />
                )}
                {instagram && (
                    <InstagramIcon />
                )}
            </AnimatedImage>  
            <ImageOverlay overlayColor={overlayColor} ref={imageOverlayRef} />
        </ImageWrapper>
    )
})

const Card = ({
    lang,
    data,
    className,
    component,
    information,
    type,
    active,
    inView,
    overlayColor
}) => {

    const itemRef = useRef(null)
    const imageRef = useRef(null)
    const headerRef = useRef(null)
    const descriptionRef = useRef(null)

    useEffect(() => {

        gsap.set(itemRef.current, { y: 15.0 })
        data.name && gsap.set(headerRef.current, { y: 5.0, alpha: 0.0 })
        gsap.set(descriptionRef.current, { y: -15.0, alpha: 0.0 })

        if (!inView) return

        const timeline = new gsap.timeline()

        timeline.to(itemRef.current, { y: 0.0, duration: 0.5, ease: 'sine.out' }, 0.0)
        timeline.add(imageRef.current.transitionIn(), 0.0)
        data.name && timeline.to(headerRef.current, { y: 0.0, alpha: 1.0, duration: 0.35, ease: 'sine.out' }, 1.0)
        timeline.to(descriptionRef.current, { y: 0.0, alpha: 1.0, duration: 0.35, ease: 'sine.out' }, 1)

        return () => {
            timeline && timeline.kill()
        }
    }, [inView])

    if (component == 'InstagramFeed') {
        return (
            <NormalCard 
                ref={itemRef}
                className={className}
            >
                <ImageComponent
                    image={data.localFile.childImageSharp.fluid}
                    alt={data.username}
                    instagram
                    ref={imageRef}
                    overlayColor={overlayColor}
                />
                <SmallDescription ref={descriptionRef}>
                    <Title>@rockstarlifestyleamsterdam — </Title>{data.caption != null && data.caption.substring(0, 150)}...
                </SmallDescription>
            </NormalCard>
        )
    } else {
        if (information == 'Excerpt only') {
            return (
                <NormalCard 
                    ref={itemRef} 
                    className={className} 
                    type={type} 
                    active={active.toString()}
                >
                    {data.featuredImage.fluid != null && (
                        <LinkWrapper to={generatePath(lang, data.buttonLink || data.slug)}>
                            <ImageComponent
                                image={data.featuredImage.fluid}
                                alt={data.featuredImage.title}
                                ref={imageRef}
                                overlayColor={overlayColor}
                            />
                        </LinkWrapper>
                    )}
                    <LargeDescription ref={descriptionRef}>
                        <Caption data={data.excerpt} />
                    </LargeDescription>
                    {data.buttonLabel && (
                        <ButtonWrapper className='button-wrapper'>
                            <ButtonPrimary
                                label={data.buttonLabel}
                                to={generatePath(lang, data.buttonLink || data.slug)}
                                inverted={true}
                            />
                        </ButtonWrapper>
                    )}
                </NormalCard>
            )
        } else if (information == 'Extended') {
            
            const { category, slug } = data
            const { tags, testimonial, headerDescription } = data.components[0]
            
            return (
                <LinkedCard 
                    ref={itemRef}
                    className={className} 
                    type={type} 
                    to={generatePath(lang, `${category.toLowerCase()}/${slug}`)} 
                    active={active.toString()}
                >
                    {data.featuredImage.fluid != null && (
                        <ImageComponent
                            image={data.featuredImage.fluid}
                            alt={data.featuredImage.title}
                            ref={imageRef}
                            overlayColor={overlayColor}
                        />
                    )}
                    <LargeDescription ref={descriptionRef}>
                        <Header ref={headerRef}>
                            <Heading>{data.name}</Heading>
                            {tags && (
                                <Tags data={tags} slice={2}></Tags>
                            )}
                        </Header>
                        <Caption data={data.excerpt != null ? data.excerpt : headerDescription} />
                        {testimonial && (
                            <StyledTestimonial data={testimonial} />
                        )}
                    </LargeDescription>
                </LinkedCard>
            )
        } else {
            return (
                <NormalCard 
                    ref={itemRef}
                    className={className} 
                    type={type} 
                    active={active.toString()}
                >
                    {data.featuredImage.fluid != null && (
                        <LinkWrapper to={generatePath(lang, data.buttonLink || data.slug)}>
                            <ImageComponent
                                image={data.featuredImage.fluid}
                                alt={data.featuredImage.title}
                                ref={imageRef}
                                overlayColor={overlayColor}
                            />
                        </LinkWrapper>
                    )}
                    <Header ref={headerRef}>
                        <Heading>{data.name}</Heading>
                    </Header>
                    <LargeDescription ref={descriptionRef}>
                        <Caption data={data.excerpt} />
                    </LargeDescription>
                    <ButtonWrapper 
                        className='button-wrapper'
                    >
                        <ButtonPrimary
                            label={data.buttonLabel || `Discover our ${data.name}`}
                            to={generatePath(lang, data.buttonLink || data.slug)}
                        />
                    </ButtonWrapper>
                </NormalCard>
            )
        }
    }
}

export default Card
