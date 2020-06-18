import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Grain from './../Layout/Grain'
import TextRenderer from './../TextRenderer'
import JoinUsForm from './../Forms/JoinUs'
import SelfTestForm from './../Forms/SelfTest'

const Header = styled.header`
    position: relative;

    width: 100%;
    height: ${props => props.theme.mobileVW(350)};

    background-color: ${props => props.theme.colors.dark};
    
    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(500)};
    `}
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

const FormWrapper = styled.div`
    position: relative;

    padding: ${props => props.theme.mobileVW(80)};

    background-color: ${props => props.theme.colors.dark};
    
    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(80)};
    `}
`

const StyledJoinUsForm = styled(JoinUsForm)`
    width: 100%;
    
    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(600)};
    `}
`

const StyledSelfTestForm = styled(SelfTestForm)`
    width: 100%;
    
    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(800)};
    `}
`

const PopupModal = ({
    lang, 
    data,
    slug, 
    closeTo
}) => {

    const {
        image
    } = data

    return (
        <>
            <Header>
                <StyledImage fluid={image.fluid} alt={image.title} />
                <StyledLink to={closeTo}>Close</StyledLink>
            </Header>
            <FormWrapper>
                {slug == 'join-us' && <StyledJoinUsForm data={data} />}
                {slug == 'self-test' && <StyledSelfTestForm data={data} />}
            </FormWrapper>
            <Grain />
        </>
    )
}

export default PopupModal
