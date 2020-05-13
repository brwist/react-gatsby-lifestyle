import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import ButtonPrimary from './Buttons/ButtonPrimary'

import { generatePath } from './../utils/helpers'

const TextStyles = css`
    &:not(last-of-type) {
        margin-bottom: calc(${props => props.theme.sizes.desktop} / 1.5);
    }
`

const Heading4 = styled.h4`
    ${TextStyles}
`

const Paragraph = styled.p`
    ${TextStyles}
`

const StyledButtonPrimary = styled(ButtonPrimary)`
    color: currentColor;

    border-color: currentColor;
`

const TextRenderer = ({
    lang,
    data,
    className,
    useInlineLink,
}) => {
    return (
        <>
            {data && documentToReactComponents(data.json, {
                renderNode: {
                    [BLOCKS.HEADING_1]: (node, children) => <h1 className={className}>{children}</h1>,
                    [BLOCKS.HEADING_4]: (node, children) => <Heading4 className={className}>{children}</Heading4>,
                    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph className={className}>{children}</Paragraph>,
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
                                    <a
                                        href={uri}
                                        target={uri.includes('http') ? '_target' : ''}
                                    >{children}</a>
                                )
                            }
                        } else {
                            if (!useInlineLink) {
                                return (
                                    <StyledButtonPrimary
                                        to={generatePath(lang, uri.replace('/', ''))}
                                        label={children}
                                        colored={true}
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
