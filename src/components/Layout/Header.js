import React, { useContext, forwardRef } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Container from './../Layout/Container'
import Navigation from './Navigation'
import ButtonMenu from './../Buttons/ButtonMenu'
import ButtonPrimary from './../Buttons/ButtonPrimary'

import LogoFullSvg from './../../images/graphics/rockstar-lifestyle.svg'
import LogoShortSvg from './../../images/graphics/rl.svg'

import { DictionaryContext } from './../../contexts/dictionary'
import { generatePath } from '../../utils/helpers'

const StyledHeader = styled.header`
    position: fixed;

    top: 0;
    left: 0;

    z-index: 4;
    
    width: 100%;

    padding: ${props => props.theme.mobileVW(25)} ${props => props.theme.sizes.mobile} 0 ${props => props.theme.sizes.mobile};
    
    ${props => props.theme.above.desktop`
        padding: ${props => props.theme.sizes.desktop} 0;
    `}
`

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${props => props.theme.below.desktop`
        padding: 0;
    `}
`

const Logo = styled(Link)`
    display: block;

    margin-right: calc(${props => props.theme.sizes.mobile} * 2);

    ${props => props.theme.above.desktop`
        margin-right: calc(${props.theme.sizes.desktop} * 2);
    `}
`

const StyledNavigation = styled(Navigation)`
    ${props => props.theme.below.desktop`
        display: none;
    `}

    ${props => props.theme.above.desktop`
        ${props.visible ? `
            opacity: 1;
        `: `
            opacity: 0;
        `}
    `}
`

const LogoImage = styled.img`
    width: ${props => props.theme.mobileVW(200)};

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(218)};
    `}
`

const InnerLeft = styled.div`
    display: flex;
    align-items: center;
`

const InnerRight = styled.div`
    display: flex;
    align-items: center;
`

const MenuClose = styled.button`
    margin-right: calc(${props => props.theme.sizes.desktop} / 2);
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.p};

    color: ${props => props.theme.colors.white};

    cursor: pointer;

    overflow: hidden;

    pointer-events: none;

    ${props => props.visible && `
        pointer-events: all;

        .close-label {
            left: 0;
        }
    `}

    ${props => props.theme.below.desktop`
        display: none;
    `}
`

const MenuCloseLabel = styled.span`
    position: relative;

    left: 100%;

    transition: left 0.25s ease-out;
`

const ButtonJoinUs = styled(ButtonPrimary)`
    ${props => props.theme.below.desktop`
        display: none;
    `}
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
}, ref) => {

    const { logoImage } = useStaticQuery(graphql`{
        logoImage: allFile(filter: {relativePath: {eq: "rockstar-lifestyle.png"}}) {
            nodes {
               publicURL
            }
        }
    }`)

    return (
        <StyledHeader ref={ref}>
            <StyledContainer>
                <InnerLeft>
                    <Logo to={generatePath(lang, '')}>
                        {/* <LogoIcon /> */}
                        <LogoImage src={logoImage.nodes[0].publicURL} alt='Rockstar Lifestyle - Logo'/>
                    </Logo>
                    <StyledNavigation 
                        lang={lang}
                        data={mainItems}
                        visible={!menuOpen}
                    />
                </InnerLeft>
                <InnerRight>
                    <MenuClose 
                        visible={menuOpen}
                        onClick={setMenuOpen}
                    >
                        <MenuCloseLabel className='close-label'>Close</MenuCloseLabel>
                    </MenuClose>
                    <ButtonMenu 
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                    />
                    <ButtonJoinUs label='Join Us' to={generatePath(lang, 'join-us')} modal/>
                </InnerRight>
            </StyledContainer>
        </StyledHeader>
    )
}

export default forwardRef(Header)
