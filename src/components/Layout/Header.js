import React, { useEffect, useRef, useContext, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import Headroom from 'react-headroom'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'


import Grain from './Grain'
import Container from './../Layout/Container'
import Navigation from './Navigation'
import ButtonMenu from './../Buttons/ButtonMenu'
import ButtonPrimary from './../Buttons/ButtonPrimary'

import LogoFullSvg from './../../images/graphics/rockstar-lifestyle.svg'
import LogoShortSvg from './../../images/graphics/rl.svg'

import { PreloaderContext } from './../../contexts/preloader'
import { DictionaryContext } from './../../contexts/dictionary'
import { generatePath } from '../../utils/helpers'

const StyledHeader = styled.header`
    position: fixed;

    z-index: 4;
    
    width: 100%;

    opacity: 0;

    padding: calc(${props => props.theme.sizes.mobile} / 1.5);

    background: linear-gradient(to bottom, ${props => props.theme.colors.dark}, transparent);
    
    transition: all 0.25s cubic-bezier(.16,1.08,.38,.98);

    ${props => props.sticky && `
		background: ${props.theme.colors.dark};

        padding: calc(${props.theme.sizes.mobile} / 1.5) 0;
    `}
    
    ${props => props.theme.above.desktop`
        padding: ${props.theme.sizes.desktop} 0;

        ${props.sticky && `
            padding: calc(${props.theme.sizes.desktop} / 2) 0;
        `}
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
    ${props => props.mobile ? `
        display: block;
    ` : `
        display: none;
    `}

    width: ${props => props.theme.mobileVW(30)};

    ${props => props.theme.above.desktop`
        ${props => props.mobile ? `
            display: none;
        ` : `
            display: block;
        `}

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
    location,
    contentTheme: {
        menu:{
            mainItems
        }
    },
    setMenuOpen,
    menuOpen
}) => {

    // States
    const [sticky, setSticky] = useState(false)

    // Refs
    const headerRef = useRef(null)

    // Context
    const preloaderState = useContext(PreloaderContext)
    const delay = preloaderState == 'preloader' ? 5.0 : 2.0

    const { logoImage, logoIcon } = useStaticQuery(graphql`{
        logoImage: allFile(filter: {relativePath: {eq: "rockstar-lifestyle.png"}}) {
            nodes {
               publicURL
            }
        }
        logoIcon: allFile(filter: {relativePath: {eq: "rl.png"}}) {
            nodes {
               publicURL
            }
        }
    }`)

    useEffect(() => {
        const tween = gsap.to(headerRef.current, { alpha: 1.0, duration: 1.0, delay: delay, ease: 'power3.out' })

        return () => {
            tween && tween.kill()
        }
    }, [])

    const scrollHandler = () => {
        if (window.scrollY >= 80) {
            setSticky(true)
        } else {
            setSticky(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <StyledHeader sticky={sticky} ref={headerRef}>
            <StyledContainer>
                <InnerLeft>
                    <Logo to={generatePath(lang, '')} onClick={() => menuOpen && setMenuOpen(!menuOpen)}>
                        <LogoImage src={logoImage.nodes[0].publicURL} alt='Rockstar Lifestyle - Logo'/>
                        <LogoImage mobile src={logoIcon.nodes[0].publicURL} alt='Rockstar Lifestyle - Logo Small'/>
                    </Logo>
                    <StyledNavigation 
                        lang={lang}
                        data={mainItems}
                        visible={!menuOpen}
                        type='header'
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
                    <ButtonJoinUs 
                        label='Get in touch' 
                        to={generatePath(lang, 'get-in-touch')} 
                        modal={{
                            modal: true
                        }}
                    />
                </InnerRight>
            </StyledContainer>
            <Grain hide={sticky ? false : true} />
        </StyledHeader>
    )
}

export default Header
