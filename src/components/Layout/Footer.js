import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Navigation from './Navigation'
import TextRenderer from '../TextRenderer'

import LogoShortSvg from './../../images/graphics/rl.svg'
import InstagramSvg from './../../images/graphics/instagram.svg'
import { generatePath } from '../../utils/helpers'
import Container from './Container'

const StyledFooter = styled.div`
    position: relative;
    
    width: 100%;

    ${props => props.type == 'menu' ? `
        position: absolute;

        left: 0;
        bottom: calc(${props.theme.sizes.desktop} * 1.5);
    ` : `
        padding-bottom: ${props.theme.desktopVW(84)};
    `}

    ${props => props.theme.below.maxWidth`
        padding: 0 ${props.theme.sizes.desktop};
    `}
`

const Inner = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FooterLeft = styled.div``

const LogoWrapper = styled(Link)`
    display: inline-block;
    vertical-align: middle;

    width: ${props => props.theme.desktopVW(28)};
    height: ${props => props.theme.desktopVW(20)};

    margin-right: ${props => props.theme.sizes.desktop};
`

const StyledLogo = styled(LogoShortSvg)`
    width: 100%;
    height: 100%;
`

const InstagramWrapper = styled.div`
    display: inline-block;
    vertical-align: middle;

    width: ${props => props.theme.desktopVW(24)};
    height: ${props => props.theme.desktopVW(24)};
`

const StyledInstagram = styled(InstagramSvg)`
    width: 100%;
    height: 100%;
`

const Address = styled(TextRenderer)`
    &:not(last-of-type) {
        margin-bottom: 0;
    }
`

const FooterRight = styled.div``
const Copyright = styled.div``

const Footer = ({
    lang, 
    type,
    setMenuOpen,
    contentTheme: {
        menu: {
            mainItems,
            subItems,
            footerItems
        },
        instagram,
        facebook,
        footerText
    }
}) => {
    return (
        <StyledFooter type={type}>
            <Inner>
                <FooterLeft>
                    <LogoWrapper to={generatePath(lang, '')}>
                        <StyledLogo />
                    </LogoWrapper>
                    <InstagramWrapper>
                        <StyledInstagram />
                    </InstagramWrapper>
                </FooterLeft>
                <Address data={footerText} useInlineLink={true} />
                <FooterRight>
                    {type == 'menu' && setMenuOpen ? (
                        <Navigation
                            lang={lang}
                            data={footerItems}
                            setMenuOpen={setMenuOpen}
                            type='small'
                        />
                    ) : (
                        <Copyright>&copy;{new Date().getFullYear()}</Copyright>
                    )}
                </FooterRight>
            </Inner>
        </StyledFooter>
    )
}

export default Footer