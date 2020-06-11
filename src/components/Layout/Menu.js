import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Navigation from './Navigation'
import TextRenderer from '../TextRenderer'
import Container from './Container'
import Footer from './Footer'
import Grain from './Grain'

import LogoShortSvg from './../../images/graphics/rl.svg'
import InstagramSvg from './../../images/graphics/instagram.svg'

import { generatePath } from '../../utils/helpers'

const StyledMenu = styled.aside`
    position: fixed;
    
    top: 0;
    left: 0;

    z-index: 3;

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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 100%;

    padding: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 8);
    `}
`

const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
`

const ImageWrapper = styled.div`
    position: relative;

    // top: 50%;
    // right: 0;

    // transform: translateY(-50%);

    width: ${props => props.theme.desktopVW(480)};
    height: ${props => props.theme.desktopVW(600)};
    
    background-color: ${props => props.theme.colors.darkGrey};

    // ${props => props.theme.below.maxWidth`
    //     right: calc(${props.theme.sizes.desktop} * 8);
    // `}

    ${props => props.theme.below.desktop`
        display: none;
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
            <Grain />
        </StyledMenu>
    )
}

export default Menu
