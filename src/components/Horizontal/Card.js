import React from 'react'
import styled, { css } from 'styled-components'
import Image from 'gatsby-image'
import { Link } from 'gatsby'

import InstagramSvg from './../../images/graphics/instagram.svg'

import TextRenderer from '../TextRenderer'
import ButtonPrimary from './../Buttons/ButtonPrimary'

import { generatePath } from './../../utils/helpers'
import Tags from '../Tags'
import Testimonial from '../Testimonial'

const CardStyles = css`
    position: relative;

    flex-shrink: 0;

    width: ${props => props.theme.desktopVW(560)};

    ${props => props.active == 'false' && `
        pointer-events: none;

        &:after {
            content: '';

            ${props.theme.styles.element.fill};

            background-color: ${props.theme.colors.dark};

            opacity: 0.65;
        }
    `}

    &:hover {
        .button-wrapper {
            opacity: 1;
        }
    }

    ${props => props.type == 'Wave' && `
        // &:not(:last-of-type) {
        //     margin-right: ${props.theme.desktopVW(160)};
        // }
        
        // &:nth-of-type(even) {
        //     margin-top: -${props.theme.desktopVW(300)};
        // }

        .image-wrapper {
            box-shadow: 0 0 80px 20px ${props.theme.colors.dark};
        }
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

    padding-right: calc(${props => props.theme.sizes.desktop} * 3);
`

const LargeDescription = styled.div`
    position: relative;
`

const ImageWrapper = styled.div`
    position: relative;

    width: 100%;

    margin-bottom: ${props => props.theme.desktopVW(40)};
    padding-bottom: 114%;
`

const StyledImage = styled(Image)`
    position: absolute !important;
    
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;

    object-fit: cover;

    img {
        opacity: 1 !important;
    }
`

const InstagramIcon = styled(InstagramSvg)`
    position: absolute;

    top: ${props => props.theme.desktopVW(40)};
    left: ${props => props.theme.desktopVW(40)};
    
    width: ${props => props.theme.desktopVW(24)};
    height: ${props => props.theme.desktopVW(24)};
`

const Header = styled.div`
    position: relative;

    ${props => props.theme.styles.flexBox.horCen};

    margin-bottom: ${props => props.theme.desktopVW(24)};
`

const Heading = styled.h4`
    display: block;
    
    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.desktop.h5};
    line-height: 1;

    text-transform: uppercase;
`

const Caption = styled(TextRenderer)`
    b  {
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }
`

const StyledTestimonial = styled(Testimonial)`
    margin-top: ${props => props.theme.sizes.desktop};
`

const Title = styled.span`
    font-family: ${props => props.theme.fontFamilies.plainRegular};
`

const ButtonWrapper = styled.div`
    opacity: 0;

    // position: absolute;

    // left: 0;
    // bottom: 0;
`

const ImageComponent = ({ image, alt, instagram }) => {
    return (
        <ImageWrapper className='image-wrapper'>
            {image != null && (
                <StyledImage fluid={image} alt={alt}  />
            )}
            {instagram && (
                <InstagramIcon />
            )}
        </ImageWrapper>
    )
}

const Card = ({
    lang,
    data,
    className,
    component,
    information,
    type,
    active
}) => {
    if (component == 'InstagramFeed') {
        return (
            <NormalCard className={className}>
                <ImageComponent
                    image={data.localFile.childImageSharp.fluid}
                    alt={data.username}
                    instagram
                />
                <SmallDescription>
                    <Title>@{data.username} — </Title>{data.caption != null && data.caption.substring(0, 150)}...
                </SmallDescription>
            </NormalCard>
        )
    } else {
        if (information == 'Excerpt only') {
            return (
                <NormalCard className={className} type={type} active={active.toString()}>
                    {data.featuredImage.fluid != null && (
                        <Link to={generatePath(lang, data.buttonLink || data.slug)}>
                            <ImageComponent
                                image={data.featuredImage.fluid}
                                alt={data.featuredImage.title}
                            />
                        </Link>
                    )}
                    <LargeDescription>
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
                <LinkedCard className={className} type={type} to={generatePath(lang, `${category.toLowerCase()}/${slug}`)} active={active.toString()}>
                    {data.featuredImage.fluid != null && (
                        <ImageComponent
                            image={data.featuredImage.fluid}
                            alt={data.featuredImage.title}
                        />
                    )}
                    <LargeDescription>
                        <Header>
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
                <NormalCard className={className} type={type} active={active.toString()}>
                    {data.featuredImage.fluid != null && (
                        <Link to={generatePath(lang, data.buttonLink || data.slug)}>
                            <ImageComponent
                                image={data.featuredImage.fluid}
                                alt={data.featuredImage.title}
                            />
                        </Link>
                    )}
                    <Header>
                        <Heading>{data.name}</Heading>
                    </Header>
                    <LargeDescription>
                        <Caption data={data.excerpt} />
                    </LargeDescription>
                    <ButtonWrapper className='button-wrapper'>
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
