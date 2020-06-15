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

    margin-bottom: ${props => props.theme.sizes.mobile};
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.m};

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const StyledTitle = styled.h1`
    display: block;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 2);

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.mobile.h3};
    line-height: 0.9;

    text-transform: uppercase;

    ${props => props.size == 'extra-large' && `
        font-size: ${props.theme.fontSizes.mobile.h1};

        .line-wrapper {
            &:nth-of-type(2) {
                margin-left: ${props.theme.mobileVW(20)};
            }

            &:nth-of-type(3) {
                margin-left: ${props.theme.mobileVW(40)};
            }   
        }
    `}

    ${props => props.size == 'medium' && `
        font-size: ${props.theme.fontSizes.mobile.h3};

        .line-wrapper {
            &:nth-of-type(2) {
                margin-left: ${props.theme.mobileVW(15)};
            }

            &:nth-of-type(3) {
                margin-left: ${props.theme.mobileVW(30)};
            }   
        }
    `}

    ${props => props.size == 'normal' && `
        margin-left: calc(${props.theme.sizes.mobile} * 2);
        
        font-size: ${props.theme.fontSizes.mobile.h4};
        line-height: 1;

        .line-wrapper {
            &:nth-of-type(2) {
                margin-left: ${props.theme.mobileVW(10)};
            }

            &:nth-of-type(3) {
                margin-left: ${props.theme.mobileVW(20)};
            }   
        }
    `}

    ${props => props.size == 'small' && `
        font-family: ${props.theme.fontFamilies.plainLight};
        font-size: ${props.theme.fontSizes.mobile.h5};
        line-height: 1.2;

        text-transform: initial;

        .line-wrapper {
            display: inline;

            &:nth-of-type(2), 
            &:nth-of-type(3) {
                margin-left: 0;
            }
        }
    `}

    ${props => props.theme.above.desktop`
        margin-bottom: ${props => props.theme.sizes.desktop};

        font-family: ${props => props.theme.fontFamilies.nbBold};
        font-size: ${props => props.theme.fontSizes.desktop.h2};

        ${props.size == 'extra-large' && `
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

        ${props.size == 'medium' && `
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

        ${props.size == 'normal' && `
            margin-left: calc(${props.theme.sizes.desktop} * 2);
            
            font-size: ${props.theme.fontSizes.desktop.h4};

            .line-wrapper {
                display: block;

                &:nth-of-type(2) {
                    margin-left: ${props.theme.desktopVW(40)};
                }

                &:nth-of-type(3) {
                    margin-left: ${props.theme.desktopVW(80)};
                }   
            }
        `}

        ${props.size == 'small' && `
            font-family: ${props.theme.fontFamilies.plainLight};
            font-size: calc(${props.theme.fontSizes.desktop.h5} * 2);

            .line-wrapper {
                &:nth-of-type(2), 
                &:nth-of-type(3) {
                    margin-left: 0;
                }
            }
        `}
    `}
`

const LineWrapper = styled.span`
    display: block;

    &:nth-of-type(2) {
        margin-left: calc(${props => props.theme.sizes.mobile} / 2);
    }

    &:nth-of-type(3) {
        margin-left: ${props => props.theme.sizes.mobile};
    }

    ${props => props.theme.above.desktop`
        &:nth-of-type(2) {
            margin-left: calc(${props.theme.sizes.desktop} * 3);
        }

        &:nth-of-type(3) {
            margin-left: calc(${props.theme.sizes.desktop} * 5);
        }   
    `}
`

const Words = styled.span``

const DescriptionWrapper = styled.div`
    width: 100%;

    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(500)};

        margin-left: calc(${props.theme.sizes.desktop} * 5);

        ${props.size == 'medium' && `
            margin-left: ${props.theme.desktopVW(120)};
        `}

        ${props.size == 'normal' && `
            max-width: ${props.theme.desktopVW(560)};

            margin-left: ${props.theme.desktopVW(80)};
        `}
    `}
`

const StyledTags = styled(Tags)`
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);
    
    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const StyledDescription = styled(TextRenderer)`
    // margin-bottom: ${props => props.theme.sizes.desktop};
`

const StyledTestimonial = styled(Testimonial)`
    margin: ${props => props.theme.sizes.mobile} 0;
    
    ${props => props.theme.above.desktop`
        margin: ${props.theme.sizes.desktop} 0;
    `}
`

const LinksWrapper = styled.div`
    margin-top: calc(${props => props.theme.sizes.mobile} / 2);
    
    ${props => props.theme.above.desktop`
        margin-top: ${props.theme.sizes.desktop};
    `}
`

const StyledButtonPrimary = styled(ButtonPrimary)`
    ${props => props.theme.below.desktop`
        &:first-of-type {
            margin-bottom: calc(${props.theme.sizes.mobile} / 3);
        }
    `}

    ${props => props.theme.above.desktop`
        &:not(:first-of-type) {
            margin-left: calc(${props.theme.sizes.desktop} / 2);
        }
    `}
`

const getLinkComponent = (links, lang) => {
    return (
        <LinksWrapper>
            {links.external ? (
                <StyledButtonPrimary href={links.external.link} label={links.external.label} inverted />
            ) : (
                <>
                    {links.map(({ title, internalLink: { __typename, slug } }, i) => {
                        
                        let modal

                        if (slug == null) {
                            modal = false
                        } else {
                            modal = slug.includes('join-us') || slug.includes('self-test') ? true : false
                        }
                        
                        return (
                            <StyledButtonPrimary 
                                key={i} 
                                lang={lang} 
                                to={generatePath(lang, slug)} 
                                label={title} 
                                inverted={i == 0} 
                                modal={modal}
                            />
                        )
                    })}
                </>
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
