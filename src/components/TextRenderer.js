import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { useWindowSize } from 'react-use'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import ButtonPrimary from './Buttons/ButtonPrimary'
import Video from './Video'

import { generatePath } from './../utils/helpers'

const TextStyles = css`
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 1.5);
    `}
`

const Heading4 = styled.h4`
    ${TextStyles}

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.p};
    line-height: 1.2;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Heading5 = styled.h5`
    ${TextStyles}

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.p};
    line-height: 1.4;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const Paragraph = styled.p`
    ${TextStyles}

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.m};
    line-height: 1.4;

    b, strong {
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }

    &:empty {
        display: none;
    }

    &:last-of-type {
        margin-bottom: 0;
    }

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.p};

        a, button {
            margin-top: calc(${props.theme.sizes.desktop} / 2);
        }
    `}
`

const UnorderedList = styled.ul`
    ${TextStyles}

    li {
        position: relative;

        padding-left: ${props => props.theme.mobileVW(25)};

        &:before {
            content: '—';
            position: absolute;

            margin-top: ${props => props.theme.mobileVW(8)};
            margin-left: -${props => props.theme.mobileVW(20)};

            font-size: ${props => props.theme.mobileVW(12)};
        }

        p {
            margin-bottom: 0;
        }
    }

    ${props => props.theme.above.desktop`
        li {
            padding-left: ${props.theme.desktopVW(25)};

            &:before {
                margin-top: ${props => props.theme.desktopVW(8)};
                margin-left: -${props => props.theme.desktopVW(20)};

                font-size: ${props => props.theme.desktopVW(12)};
            }
        }
    `}
`

const OrderedList = styled.ol`
    ${TextStyles}

    padding-left: ${props => props.theme.mobileVW(25)};

    list-style: decimal;

    font-size: ${props => props.theme.mobileVW(12)};

    ${props => props.theme.above.desktop`
        padding-left: ${props.theme.desktopVW(20)};

        font-size: ${props => props.theme.desktopVW(15)};
    `}
`

const StyledButtonPrimary = styled(ButtonPrimary)`
    /* color: currentColor;

    border-color: currentColor; */
`

const StyledLink = styled.a`
    color: currentColor;

    transition: color 0.5s cubic-bezier(.16,1.08,.38,.98);

    &:hover {
        color: ${props => props.theme.colors.orange};
    }
`

const Media = styled.div`
    position: relative;
    
    margin-top: ${props => props.theme.sizes.mobile};
    padding-top: 56%;

    ${props => props.theme.above.desktop`
        margin-top: calc(${props.theme.sizes.desktop} * 2);
    `}
`

const StyledVideo = styled(Video)`
    ${props => props.theme.styles.element.fill};

    .video {
        position: relative;

        top: initial;
        left: initial;

        transform: none;

        width: 100%;
        height: 100%;
    }
`

const StyledImage = styled.img`
    display: block;

    width: 100%;

    margin: ${props => props.theme.sizes.mobile} 0;

    ${props => props.theme.above.desktop`
        margin: calc(${props.theme.sizes.desktop} * 2) 0;
    `}
`

const VideoTitle = styled.span`
    display: block;

    margin: calc(${props => props.theme.sizes.mobile} / 3) 0 ${props => props.theme.sizes.mobile} 0;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.xxs};

    text-align: right;

    opacity: 0.5;

    ${props => props.theme.above.desktop`
        margin: ${props.theme.sizes.desktop} 0 calc(${props.theme.sizes.desktop} * 2) 0;

        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const TextRenderer = ({
    lang,
    data,
    className,
    useInlineLink,
}) => {

    const { width: windowWidth } = useWindowSize()

    const checkModal = uri => {
        if (uri.includes('join-us') || uri.includes('self-test') || uri.includes('reserve-your-spot')) {
            return windowWidth < 1023 ? false : true 
        } else {
            return false
        }
    }

    return (
        <>
            {data && documentToReactComponents(data.json, {
                renderNode: {
                    [BLOCKS.HEADING_1]: (node, children) => <h1 className={className}>{children}</h1>,
                    [BLOCKS.HEADING_2]: (node, children) => <h2 className={className}>{children}</h2>,
                    [BLOCKS.HEADING_3]: (node, children) => <h3 className={className}>{children}</h3>,
                    [BLOCKS.UL_LIST]: (node, children) => <UnorderedList className={className}>{children}</UnorderedList>,
                    [BLOCKS.OL_LIST]: (node, children) => <OrderedList className={className}>{children}</OrderedList>,
                    [BLOCKS.HEADING_4]: (node, children) => <Heading4 className={className}>{children}</Heading4>,
                    [BLOCKS.HEADING_5]: (node, children) => <Heading5 className={className}>{children}</Heading5>,
                    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph className={className}>{children}</Paragraph>,
                    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                        const { data: { target: { fields } } } = node

                        if (typeof fields == 'undefined' || fields.file['en-US'] == 'undefined') return
                        
                        return (
                            <StyledImage className='embedded-asset' src={fields.file['en-US'].url} alt={fields.title['en-US'] || 'RL - Embedded Image'} />
                        )
                    },
                    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
                        const { data: { target: { fields } } } = node
                        
                        if (typeof fields == 'undefined' || typeof fields.videoUrl['en-US'] == 'undefined') return
                        
                        if (fields) {
                            return (
                                <>
                                    <Media>
                                        <StyledVideo
                                            className={className}
                                            url={fields.videoUrl['en-US']}
                                            title={fields.name['en-US'] || 'RL - Embedded Video'}
                                            inline={true}
                                            inView={true}
                                        />
                                    </Media>
                                    {fields.videoSubtitle && (
                                        <VideoTitle>{fields.videoSubtitle['en-US']}</VideoTitle>
                                    )}
                                </>
                            )
                        } else {
                            return null
                        }
                    },
                    [INLINES.HYPERLINK]: (node, children) => {
                        const { data: { uri } } = node

                        if (uri.includes('mailto') || uri.includes('http')) {
                            if (!useInlineLink) {
                                return (
                                    <StyledButtonPrimary
                                        href={uri}
                                        label={children}
                                        colored={true}
                                    />
                                )
                            } else {
                                return (
                                    <StyledLink href={uri} target={uri.includes('http') ? '_target' : ''}>{children}</StyledLink>
                                )
                            }
                        } else {
                            if (!useInlineLink) {
                                return (
                                    <StyledButtonPrimary
                                        to={generatePath(lang, uri.replace('/', ''))}
                                        label={children}
                                        colored={true}
                                        modal={checkModal(uri)}
                                    />
                                )
                            } else {
                                return (
                                    <Link
                                        to={generatePath(lang, uri.replace('/', ''))}
                                    >{children}</Link>
                                )
                            }
                        }
                    }
                }
            })}
        </>
    )
}

export default TextRenderer
