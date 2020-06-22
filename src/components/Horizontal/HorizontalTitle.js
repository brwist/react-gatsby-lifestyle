import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Container from './../Layout/Container'
import Title from './../Title'

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${props => props.type == 'Draggable' && `
        padding: ${props.theme.mobileVW(240)} 0 ${props.theme.mobileVW(120)} 0;
    `}

    ${props => props.theme.above.desktop`
        flex-direction: row;
        align-items: flex-end;

        ${props.type == 'Scrollable' && `
            position: sticky;
            
            top: 0;
            left: 0;

            padding-top: ${props.theme.desktopVW(90)};
        `}

        ${props.type == 'Draggable' && `
            padding: ${props.theme.desktopVW(240)} 0 ${props.theme.desktopVW(120)} 0;
        `}
    `}
`

const StyledTitle = styled(Title)`
    .title-wrapper {
        margin-left: 0;
        margin-bottom: ${props => props.theme.sizes.mobile};
    }

    ${props => props.theme.above.desktop`
        .title-wrapper {
            margin-bottom: 0;
        }
    `}
`

const Description = styled(Title)`
    a {
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }
    
    .description {
        margin-bottom: 0;
    }

    ${props => props.theme.above.desktop`
        .description-wrapper {
            max-width: calc(${props.theme.sizes.desktop} * 11);
            
            margin-right: calc(${props.theme.sizes.desktop} * 7);
            margin-left: 0;
        }
    `}
`

const HorizontalTitle = ({
    lang,
    className,
    title, 
    description,
    size,
    useInlineLink
}, ref) => {
    return (
        <StyledContainer className={className}>
            {title && (
                <StyledTitle ref={ref} title={title} size={size}/>
            )}
            {description && (
                <Description ref={ref} lang={lang} description={description} useInlineLink={useInlineLink} />
            )}
        </StyledContainer>
    )
}

export default forwardRef(HorizontalTitle)
