import React, { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Navigation from './Navigation'
import TextRenderer from '../TextRenderer'
import LogoShortSvg from './../../images/graphics/rl.svg'
import InstagramSvg from './../../images/graphics/instagram.svg'
import Container from './Container'
import Grain from './../Layout/Grain'

import { generatePath } from '../../utils/helpers'
import gsap from 'gsap/gsap-core'

const StyledFooter = styled.footer`
    position: relative;

    width: 100%;

    padding: ${props => props.theme.sizes.mobile} 0;

    ${props => props.type == 'menu' && `
        position: absolute;

        left: 0;
        bottom: 0;
    `}

    ${props => props.theme.above.desktop`
        padding: 0 0 ${props.theme.sizes.desktop} 0;
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

    width: ${props => props.theme.mobileVW(25)};
    height: ${props => props.theme.mobileVW(15)};

    margin-right: calc(${props => props.theme.sizes.mobile} / 2);

    ${props => props.theme.above.desktop`
        width: ${props => props.theme.desktopVW(28)};
        height: ${props => props.theme.desktopVW(20)};

        margin-right: ${props => props.theme.sizes.desktop};
    `}
`

const StyledLogo = styled.img`
    width: 100%;
    height: 100%;
`

const InstagramWrapper = styled.a`
    display: inline-block;
    vertical-align: middle;

    width: ${props => props.theme.mobileVW(20)};
    height: ${props => props.theme.mobileVW(20)};

    overflow: hidden;

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(24)};
        height: ${props.theme.desktopVW(24)};

        &:hover {
            .instagram-inner {
                transform: translateY(-${props.theme.desktopVW(40)});
            }
        }
    `}
`

const InstagramInner = styled.div`
    display: block;

    position: relative;

    transition: transform 0.25s ease-out;
`

const StyledInstagram = styled(InstagramSvg)`
    width: 100%;
    height: 100%;

    &:first-of-type {
        margin-bottom: ${props => props.theme.desktopVW(15)};
    }
`

const Address = styled(TextRenderer)`
    position: absolute;

    left: 50%;

    transform: translateX(-50%);

    &:not(:last-of-type) {
        margin-bottom: 0;
    }

    ${props => props.theme.below.desktop`
        display: none;
    `}
`

const FooterRight = styled.div``

const StyledNavigation = styled(Navigation)`
    ${props => props.theme.below.desktop`
        display: none;
    `}
`

const CopyrightStyles = css`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.h6};

    ${props => props.theme.above.desktop`
        font-size: ${props => props.theme.fontSizes.desktop.h6};
    `}
`

const Copyright = styled.span`
    ${CopyrightStyles}
`

const MobileCopyright = styled.span`
    ${CopyrightStyles}

    ${props => props.theme.above.desktop`
        display: none;
    `}
`

const Footer = ({
    lang, 
    type,
    setMenuOpen,
    className,
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

    const footerRef = useRef(null)
    const [ inViewRef, inView ] = useInView()

    const { logoImage } = useStaticQuery(graphql`{
        logoImage: allFile(filter: {relativePath: {eq: "rl.png"}}) {
            nodes {
               publicURL
            }
        }
    }`)

    const setRefs = useCallback((node) => {
        footerRef.current = node
        inViewRef(node)
    }, [inViewRef])
    

    useEffect(() => {

        gsap.set(footerRef.current, { alpha: 0.0 })
        
        if (!inView) return

        const tween = gsap.to(footerRef.current, { alpha: 1.0, y: 0.0, duration: 0.35, ease: 'sine.inOut' })

        return () => {
            tween && tween.kill()
        }
    }, [inView])

    return (
        <StyledFooter ref={setRefs} className={className} type={type}>
            <Inner>
                <FooterLeft>
                    <LogoWrapper to={generatePath(lang, '')}>
                        <StyledLogo src={logoImage.nodes[0].publicURL} alt='Rockstar Lifestyle - Short logo'/>
                    </LogoWrapper>
                    <InstagramWrapper href={instagram} target='_blank'>
                        <InstagramInner className='instagram-inner'>
                            <StyledInstagram />
                            <StyledInstagram />
                        </InstagramInner>
                    </InstagramWrapper>
                </FooterLeft>
                <Address data={footerText} useInlineLink={true} />
                <FooterRight>
                    {type == 'menu' && setMenuOpen ? (
                        <>
                            <StyledNavigation
                                lang={lang}
                                data={footerItems}
                                setMenuOpen={setMenuOpen}
                                type='small'
                            />
                            <MobileCopyright>&copy;{new Date().getFullYear()}</MobileCopyright>
                        </>
                    ) : (
                        <Copyright>&copy;{new Date().getFullYear()}</Copyright>
                    )}
                </FooterRight>
            </Inner>
        </StyledFooter>
    )
}

export default Footer