import React from 'react'
import styled from 'styled-components'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import TextRenderer from './TextRenderer'
import Tags from './Tags'
import ButtonPrimary from './Buttons/ButtonPrimary'
import Testimonial from './Testimonial'

import { generatePath } from './../utils/helpers'

const TitleWrapper = styled.div`
    position: relative;
`

const Category = styled.span`
    display: block;

    margin-bottom: ${props => props.theme.sizes.desktop};
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.desktop.m};

    text-transform: uppercase;
`

const StyledTitle = styled.h1`
    display: block;

    margin-bottom: ${props => props.theme.sizes.desktop};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.desktop.h2};
    line-height: 0.9;

    text-transform: uppercase;

    ${props => props.size == 'extra-large' && `
        font-size: ${props.theme.fontSizes.desktop.h1};

        .line-wrapper {
            &:nth-of-type(2) {
                margin-left: ${props.theme.desktopVW(60)};
            }

            &:nth-of-type(3) {
                margin-left: ${props.theme.desktopVW(120)};
            }   
        }
    `}

    ${props => props.size == 'medium' && `
        font-size: ${props.theme.fontSizes.desktop.h3};

        .line-wrapper {
            &:nth-of-type(2) {
                margin-left: ${props.theme.desktopVW(60)};
            }

            &:nth-of-type(3) {
                margin-left: ${props.theme.desktopVW(120)};
            }   
        }
    `}

    ${props => props.size == 'normal' && `
        margin-left: calc(${props.theme.sizes.desktop} * 2);
        
        font-size: ${props.theme.fontSizes.desktop.h4};
        line-height: 1;

        .line-wrapper {
            &:nth-of-type(2) {
                margin-left: ${props.theme.desktopVW(40)};
            }

            &:nth-of-type(3) {
                margin-left: ${props.theme.desktopVW(80)};
            }   
        }
    `}

    ${props => props.size == 'small' && `
        font-family: ${props.theme.fontFamilies.plainLight};
        font-size: calc(${props.theme.fontSizes.desktop.h5} * 2);
        line-height: 1.2;

        text-transform: initial;

        .line-wrapper {
            &:nth-of-type(2), 
            &:nth-of-type(3) {
                margin-left: 0;
            }
        }
    `}
`

const LineWrapper = styled.span`
    display: block;

    &:nth-of-type(2) {
        margin-left: calc(${props => props.theme.sizes.desktop} * 3);
    }

    &:nth-of-type(3) {
        margin-left: calc(${props => props.theme.sizes.desktop} * 5);
    }
`

const Words = styled.span``

const DescriptionWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.desktopVW(500)};

    margin-left: calc(${props => props.theme.sizes.desktop} * 5);

    ${props => props.size == 'medium' && `
        margin-left: ${props.theme.desktopVW(120)};
    `}

    ${props => props.size == 'normal' && `
        max-width: ${props.theme.desktopVW(560)};

        margin-left: ${props.theme.desktopVW(80)};
    `}

    ${props => props.size == 'small' && `
        margin-left: 0;
    `}
`

const StyledTags = styled(Tags)`
    margin-bottom: ${props => props.theme.sizes.desktop};
`

const StyledDescription = styled(TextRenderer)`
    // margin-bottom: ${props => props.theme.sizes.desktop};
`

const StyledTestimonial = styled(Testimonial)`
    margin: ${props => props.theme.sizes.desktop} 0;
`

const LinksWrapper = styled.div`
    margin-top: ${props => props.theme.sizes.desktop};
`

const StyledButtonPrimary = styled(ButtonPrimary)`
    &:not(:first-of-type) {
        margin-left: calc(${props => props.theme.sizes.desktop} / 2);
    }
`

const getLinkComponent = (links, lang) => {
    return (
        <LinksWrapper>
            {links.internal && links.internal.map(({ title, internalLink: { __typename, slug }}, i) => (
                <StyledButtonPrimary key={i} lang={lang} to={generatePath(lang, slug)} label={title} inverted={i == 0} />
            ))}
            {links.external && (
                <StyledButtonPrimary href={links.external.link} label={links.external.label} inverted />
            )}
        </LinksWrapper>
    )
}

const Title = ({
    lang,
    inView,
    category,
    size,
    title,
    tags,
    testimonial,
    description,
    links,
    className,
    useInlineLink
}) => {
    return (
        <TitleWrapper size={size} className={`title-wrapper ${className && className}`}>
            {category == 'Event' && (
                <Category>{category}</Category>
            )}
            {title && (
                <StyledTitle className='heading' size={size}>
                    {title && documentToReactComponents(title.json, {
                        renderNode: {
                            [BLOCKS.HEADING_1]: (node, children) => (
                                <LineWrapper className='line-wrapper'>
                                    <Words>{children}</Words>
                                </LineWrapper>
                            ),
                            [BLOCKS.PARAGRAPH]: (node, children) => (
                                <LineWrapper className='line-wrapper'>
                                    <Words>{children}</Words>
                                </LineWrapper>
                            )
                        }
                    })}
                </StyledTitle>
            )}
            {description && (
                <DescriptionWrapper className='description-wrapper' size={size}>
                    {tags && (
                        <StyledTags 
                            className='tags'
                            data={tags}
                        />
                    )}
                    {description && (
                        <StyledDescription
                            className='description'
                            lang={lang}
                            data={description}
                            useInlineLink={useInlineLink}
                        />
                    )}
                    {testimonial && (
                        <StyledTestimonial 
                            className='testimonials'
                            data={testimonial} 
                        />
                    )}
                    {links && getLinkComponent(links, lang)}
                </DescriptionWrapper>
            )}
        </TitleWrapper>
    )
}

export default Title
