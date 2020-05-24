import React, { useContext } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import { DictionaryContext } from './../../contexts/dictionary'

import Container from './../Layout/Container'
import Navigation from './Navigation'
import ButtonMenu from './../Buttons/ButtonMenu'
import ButtonPrimary from './../Buttons/ButtonPrimary'

import LogoFullSvg from './../../images/graphics/rockstar-lifestyle.svg'
import LogoShortSvg from './../../images/graphics/rl.svg'
import { generatePath } from '../../utils/helpers'

const StyledHeader = styled.header`
    position: fixed;

    top: 0;
    left: 0;

    z-index: 2;
    
    width: 100%;

    padding: ${props => props.theme.sizes.desktop} 0;
`

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled(Link)`
    display: inline-block;
    vertical-align: middle;

    width: ${props => props.theme.desktopVW(218)};
    height: ${props => props.theme.sizes.desktop};

    margin-right: calc(${props => props.theme.sizes.desktop} * 2);
`

const LogoIcon = styled(LogoFullSvg)`
    width: 100%;
    height: 100%;
`

const InnerLeft = styled.div`
    display: flex;
    align-items: center;

    ${props => props.visible ? `
        opacity: 1;
    `: `
        opacity: 0;
    `}
`

const InnerRight = styled.div`
    display: flex;
    align-items: center;
`

const MenuClose = styled.button`
    margin-right: ${props => props.theme.sizes.desktop};
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.p};

    color: ${props => props.theme.colors.white};

    cursor: pointer;
`

const Header = ({
    lang,
    contentTheme: {
        menu:{
            mainItems
        }
    },
    setMenuOpen,
    menuOpen
}) => {
    return (
        <StyledHeader>
            <StyledContainer>
                <InnerLeft visible={!menuOpen}>
                    <Logo to={generatePath(lang, '')}>
                        <LogoIcon />
                    </Logo>
                    <Navigation 
                        lang={lang}
                        data={mainItems}
                    />
                </InnerLeft>
                <InnerRight>
                    <ButtonMenu 
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                    />
                    {menuOpen && (
                        <MenuClose 
                            visible={menuOpen}
                            onClick={setMenuOpen}
                        >Close</MenuClose>
                    )}
                    <ButtonPrimary label='Join Us' to={generatePath(lang, 'join-us')} modal/>
                </InnerRight>
            </StyledContainer>
        </StyledHeader>
    )
}

export default Header
