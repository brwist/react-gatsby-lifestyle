import React, { useRef, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'
import styled from 'styled-components'

import Grain from './Grain'

const Wrapper = styled.div`
    display: f;ex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: fixed;

    top: 0;
    left: 0;

    z-index: 5;

    width: 100%;
    height: 100%;

    background-color: ${props => props.theme.colors.dark};
`

const LogoWrapper = styled.div`
    position: relative;
`

const LogoOverlay = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: ${props => props.theme.colors.dark};
`

const Logo = styled.img`
    width: ${props => props.theme.desktopVW(350)};
`

const Preloader = ({
    showPreloader
}) => {

    const preloaderRef = useRef(null)
    const logoWrapperRef = useRef(null)
    const logoOverlayRef = useRef(null)

    const { logoImage } = useStaticQuery(graphql`{
        logoImage: allFile(filter: {relativePath: {eq: "rockstar-lifestyle.png"}}) {
            nodes {
               publicURL
            }
        }
    }`)

    useEffect(() => {
        const timeline = new gsap.timeline({ onComplete: () => showPreloader(false) })
        timeline.fromTo(logoOverlayRef.current, { scaleY: 1, transformOrigin: 'bottom' }, { scaleY: 0, duration: 3, ease: 'power3.out' }, 0)
        timeline.to(logoWrapperRef.current, { opacity: 0, duration: 0.5, ease: 'power3.out' }, 3)
        timeline.to(preloaderRef.current, { opacity: 0, duration: 0.25, ease: 'power3.out' }, 3.25)
    }, [])

    return (
        <Wrapper ref={preloaderRef}>
            <LogoWrapper ref={logoWrapperRef}>
                <LogoOverlay ref={logoOverlayRef}/>
                <Logo src={logoImage.nodes[0].publicURL} alt='Rockstar Lifestyle - Logo' />
            </LogoWrapper>
            <Grain />
        </Wrapper>
    )
}

export default Preloader
