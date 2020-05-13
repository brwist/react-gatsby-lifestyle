import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import Container from './Layout/Container'
import Title from './Title'

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: calc(${props => props.theme.sizes.desktop} * 10) 0;
`

const Content = styled(Title)`
    .description-wrapper {
        max-width: ${props => props.theme.desktopVW(480)};
    }

    .description {
        font-size: ${props => props.theme.fontSizes.desktop.h6};
        line-height: 1.3;
    }
`

const ImageWrapper = styled.div`
    width: ${props => props.theme.desktopVW(500)};
    height: ${props => props.theme.desktopVW(500)};

    background-color: ${props => props.theme.colors.darkGrey};
`

const StyledImage = styled(Image)`
    ${props => props.theme.styles.image.objectCover};
`

const JoinUs = ({
    lang,
    inView,
    data: {
        contentTitle,
        contentDescription,
        image
    }
}) => {
    return (
        <Wrapper>
            <Content
                lang={lang}
                title={contentTitle}
                description={contentDescription}
                size='medium'
            />
            <ImageWrapper>
                <StyledImage fluid={image.fluid} alt={image.alt} />
            </ImageWrapper>
        </Wrapper>
    )
}

export default JoinUs
