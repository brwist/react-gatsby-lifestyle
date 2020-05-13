import React from 'react'
import styled from 'styled-components'

import Container from './../Layout/Container'
import Title from './../Title'

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    ${props => props.type == 'Scrollable' && `
        position: sticky;
        
        top: 0;
        left: 0;

        padding-top: ${props.theme.desktopVW(90)};
    `}

    ${props => props.type == 'Draggable' && `
        padding: ${props.theme.desktopVW(240)} 0 ${props.theme.desktopVW(120)} 0;
    `}
`

const StyledTitle = styled(Title)`
    .heading {
        margin-left: 0;
        margin-bottom: 0;
    }
`

const Description = styled(Title)`
    a {
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }
    
    .description-wrapper {
        max-width: ${props => props.theme.desktopVW(350)};
    }
    
    .description {
        margin-bottom: 0;
    }
`

const HorizontalTitle = ({
    lang,
    className,
    title, 
    description,
    size,
    useInlineLink
}) => {
    return (
        <StyledContainer className={className}>
            {title && (
                <StyledTitle title={title} size={size}/>
            )}
            {description && (
                <Description lang={lang} description={description} useInlineLink={useInlineLink} />
            )}
        </StyledContainer>
    )
}

export default HorizontalTitle
