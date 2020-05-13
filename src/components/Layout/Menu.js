import React from 'react'
import styled from 'styled-components'

import Navigation from './Navigation'
import TextRenderer from '../TextRenderer'

import LogoShortSvg from './../../images/graphics/rl.svg'
import InstagramSvg from './../../images/graphics/instagram.svg'
import Container from './Container'
import { Link } from 'gatsby'
import { generatePath } from '../../utils/helpers'
import Footer from './Footer'

const StyledMenu = styled.aside`
    position: fixed;
    
    top: 0;
    left: 0;

    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: ${props => props.theme.colors.dark};

    ${props => props.visible ? `
        display: block;
    ` : `
        display: none;
    `}
`

const StyledContainer = styled(Container)`
    height: 100%;

    padding: calc(${props => props.theme.sizes.desktop} * 3.75) 0;

    ${props => props.theme.below.maxWidth`
        padding: ${props => props.theme.sizes.desktop};
    `}
`

const NavigationWrapper = styled.div`
    position: absolute;

    top: 50%;

    transform: translateY(-50%);
`

const ImageWrapper = styled.div`
    position: absolute;

    top: 50%;
    right: 0;

    transform: translateY(-50%);

    width: ${props => props.theme.desktopVW(480)};
    height: ${props => props.theme.desktopVW(600)};
    
    background-color: ${props => props.theme.colors.darkGrey};

    ${props => props.theme.below.maxWidth`
        right: ${props => props.theme.sizes.desktop};
    `}
`

const Menu = ({
    lang, 
    className,
    menuOpen,
    setMenuOpen,
    contentTheme
}) => {
    return (
        <StyledMenu 
            className={className} 
            visible={menuOpen}
        >
            <StyledContainer>
                <NavigationWrapper>
                    <Navigation
                        lang={lang}
                        data={contentTheme.menu.mainItems}
                        setMenuOpen={setMenuOpen}
                        type='main'
                    />
                    <Navigation
                        lang={lang}
                        data={contentTheme.menu.subItems}
                        setMenuOpen={setMenuOpen}
                        type='sub'
                    />
                </NavigationWrapper>
                <ImageWrapper></ImageWrapper>
                <Footer 
                    lang={lang}
                    contentTheme={contentTheme}
                    setMenuOpen={setMenuOpen}
                    type='menu' 
                />
            </StyledContainer>
        </StyledMenu>
    )
}

export default Menu
