import React, { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Navigation from './Navigation'
import TextRenderer from '../TextRenderer'
import LogoShortSvg from './../../images/graphics/rl.svg'
import Container from './Container'
import Grain from './../Layout/Grain'
import AnimatedIcon from './../AnimatedIcon'

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

    ${props => props.theme.below.desktop`
        position: absolute;

        bottom: 0;
        left: 0;
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

    margin-right: calc(${props => props.theme.sizes.mobile} / 2);

    ${props => props.theme.above.desktop`
        margin-right: ${props => props.theme.sizes.desktop};
    `}
`

const StyledLogo = styled.img`
    width: ${props => props.theme.mobileVW(25)};

    ${props => props.theme.above.desktop`
        width: ${props => props.theme.desktopVW(35)};
    `}
`

const StyledAnimatedIcon = styled(AnimatedIcon)`
    &:first-of-type {
        margin-right: calc(${props => props.theme.sizes.mobile} / 2);
    }

    ${props => props.theme.above.desktop`
        margin-right: ${props => props.theme.sizes.desktop};
    `}
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
                    <StyledAnimatedIcon instagram={instagram} /> 
                    <StyledAnimatedIcon facebook={facebook} /> 
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