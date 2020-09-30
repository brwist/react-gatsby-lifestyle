import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Grain from './../Layout/Grain'
import TextRenderer from './../TextRenderer'
import GlobalForm from './../Forms/Global'
import SelfTestForm from './../Forms/SelfTest'

const ModalInner = styled.div`
    box-shadow: 0 0 ${props => props.theme.desktopVW(100)} rgba(0, 0, 0, 0.85);
`

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

    &:after {
        content: '';
        
        ${props => props.theme.styles.element.fill};
        
        background: linear-gradient(70deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.9));
    }
`

const Copy = styled.div`
    width: 100%;

    margin-bottom: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const Title = styled.h4`
    display: block;

    margin-bottom: ${props => props.theme.sizes.mobile};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.mobile.h5};

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};

        font-family: ${props.theme.fontFamilies.nbBold};
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const StyledLink = styled(Link)`
    position: absolute;
    
    top: ${props => props.theme.sizes.desktop};
    right: ${props => props.theme.sizes.desktop};

    font-size: ${props => props.theme.fontSizes.desktop.p};

    color: ${props => props.theme.colors.light};
`

const CrossIcon = styled.span`
    margin-right: ${props => props.theme.mobileVW(10)};

    ${props => props.theme.above.desktop`
        margin-right: ${props.theme.desktopVW(10)};
    `}
`

const FormWrapper = styled.div`
    position: relative;

    padding: ${props => props.theme.mobileVW(80)};

    background-color: ${props => props.theme.colors.dark};
    
    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(80)};
    `}
`

const StyledGlobalForm = styled(GlobalForm)`
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
    formInput,
    slug, 
    closeTo
}) => {

    const {
        image,
        contentTitle,
        contentDescription
    } = data

    let showGlobalForm = slug == 'join-us' || slug == 'reserve-your-space'

    return (
        <ModalInner>
            <Header>
                <StyledImage 
                    fluid={image.fluid} 
                    alt={image.title} 
                />
                <StyledLink to={closeTo}>
                    <CrossIcon>&#10005;</CrossIcon> Close
                </StyledLink>
            </Header>
            <FormWrapper>
                <Copy>
                    <Title>{contentTitle}</Title>
                    <TextRenderer data={contentDescription}/>
                </Copy>
                {showGlobalForm && <StyledGlobalForm data={data} formInput={formInput} />}
                {slug == 'self-test' && <StyledSelfTestForm data={data} />}
            </FormWrapper>
            {/* <Grain /> */}
        </ModalInner>
    )
}

export default PopupModal
