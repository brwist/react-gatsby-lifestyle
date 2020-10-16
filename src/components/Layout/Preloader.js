import React, { useRef, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'
import styled, { css } from 'styled-components'

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

    overflow: hidden;

    height: 0;
`

const logoStyles = css`
    height: ${props => props.theme.mobileVW(20)};

    max-height: 15px;

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(25)};

        max-height: 45px;
    `}
`

const WrapperInner = styled.div`
    position: relative;

    z-index: 1;

    ${logoStyles}
`

const Logo = styled.img`
    ${logoStyles}
`

const Video = styled.video`
    position: absolute;
    
    top: 0;
    left: 0;

    z-index: 0;

    width: 100%;
    height: 100%;

    opacity: 1;

    object-fit: cover;
    object-position: center;
`

const Preloader = ({
    showPreloader
}) => {

    const preloaderRef = useRef(null)
    const logoWrapperRef = useRef(null)

    const { logoImage, grainVideo } = useStaticQuery(graphql`{
        logoImage: allFile(filter: {relativePath: {eq: "rockstar-lifestyle.png"}}) {
            nodes {
               publicURL
            }
        },
        grainVideo: allContentfulTheme {
            nodes {
                preloaderGrain {
                    file {
                        url
                    }
                }
            }
        }
    }`)

    useEffect(() => {

        let vh = typeof window !== 'undefined' ? window.innerHeight * 0.01 : 1000
        preloaderRef.current.style.setProperty('--vh', `${vh}px`)

        gsap.set(logoWrapperRef.current, { height: 0.0 })
        
    }, [])

    useEffect(() => {

        const timeline = new gsap.timeline({ onComplete: () => showPreloader() })
        timeline.fromTo(logoWrapperRef.current, { height: 0.0, transformOrigin: 'top' }, { height: 'auto', duration: 1.5, ease: 'power3.out' }, 0.5)
        timeline.to(logoWrapperRef.current, { alpha: 0.0, duration: 0.5, ease: 'power3.out' }, 2.0)
        timeline.to(preloaderRef.current, { alpha: 0.0, duration: 0.5, ease: 'sine.out' }, 2.5)

    }, [])

    return (
        <Wrapper ref={preloaderRef}>
            <WrapperInner>
                <LogoWrapper ref={logoWrapperRef}>
                    <Logo src={logoImage.nodes[0].publicURL} alt='Rockstar Lifestyle - Logo' />
                </LogoWrapper>
            </WrapperInner>
            <Video src={grainVideo.nodes[0].preloaderGrain.file.url} loop muted autoPlay playsInline />
        </Wrapper>
    )
}

export default Preloader
