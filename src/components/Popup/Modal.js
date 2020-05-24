import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

import TextRenderer from './../TextRenderer'
import JoinUsForm from './../Forms/JoinUs'

const Header = styled.header`
    position: relative;

    width: 100%;
    height: ${props => props.theme.desktopVW(500)};
`

const StyledImage = styled(Image)`
    ${props => props.theme.styles.element.fill};
`

const StyledLink = styled(Link)`
    position: absolute;
    
    top: ${props => props.theme.sizes.desktop};
    right: ${props => props.theme.sizes.desktop};

    color: ${props => props.theme.colors.light};
`

const Content = styled.div`
    padding: ${props => props.theme.desktopVW(80)};
`

const Title = styled.h4`
    display: block;
    
    margin-bottom: ${props => props.theme.sizes.desktop};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.desktop.h4};

    text-transform: uppercase;
`

const Body = styled(TextRenderer)`
    width: 100%;
    max-width: ${props => props.theme.desktopVW(600)};

    h4 {
        font-size: ${props => props.theme.fontSizes.desktop.h6};
    }
`

const FormWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.desktopVW(600)};

    padding: 0 ${props => props.theme.desktopVW(80)};
`

const PopupModal = ({
    lang, 
    data,
    slug, 
    closeTo
}) => {

    const {
        contentTitle,
        contentDescription,
        image
    } = data

    return (
        <>
            <Header>
                <StyledImage fluid={image.fluid} alt={image.title} />
                <StyledLink to={closeTo}>Close</StyledLink>
            </Header>
            <Content>
                <Title>{contentTitle}</Title>
                <Body data={contentDescription} />
            </Content>
            <FormWrapper>
                {slug == 'join-us' && <JoinUsForm />}
            </FormWrapper>
        </>
    )
}

export default PopupModal
