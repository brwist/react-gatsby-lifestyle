import React, { useRef, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'
import styled from 'styled-components'

import Grain from './Grain'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: fixed;

    top: 0;
    left: 0;

    z-index: 5;

    width: 100%;
    
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

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
    width: ${props => props.theme.mobileVW(200)};

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(500)};
    `}
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

        let vh = typeof window !== 'undefined' ? window.innerHeight * 0.01 : 1000
        preloaderRef.current.style.setProperty('--vh', `${vh}px`)
        
    }, [])

    useEffect(() => {

        const timeline = new gsap.timeline({ delay: 1.0, onComplete: () => showPreloader() })
        timeline.fromTo(logoOverlayRef.current, { scaleY: 1.0, transformOrigin: 'bottom' }, { scaleY: 0.0, duration: 1.0, ease: 'power3.out' }, 0.0)
        timeline.to(logoWrapperRef.current, { alpha: 0.0, duration: 0.35, ease: 'power3.out' }, 1.5)
        timeline.to(preloaderRef.current, { alpha: 0.0, duration: 0.5, ease: 'sine.out' }, 1.5)

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
