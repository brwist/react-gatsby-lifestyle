import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'

import NormalBanner from './NormalBanner'
import HomeBanner from './HomeBanner'

import { PreloaderContext } from './../contexts/preloader'

const StyledHeroBanner = styled.div`
    position: relative;

    width: 100%;
    
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    max-height: 2000px;
`

const HeroBanner = ({
    lang,
    inView,
    className,
    category,
    data
}) => {

    // Refs
    const bannerRef = useRef(null)

    // Context
    const preloaderState = useContext(PreloaderContext)
    const delay = preloaderState == 'preloader' ? 3.0 : 0.5

    useEffect(() => {

        let vh = typeof window !== 'undefined' ? window.innerHeight * 0.01 : 1000
        bannerRef.current.style.setProperty('--vh', `${vh}px`)
    
    }, [])

    return (
        <StyledHeroBanner 
            ref={bannerRef}
            className={className}
            type={data.bannerType} 
        >
            {data.bannerType == 'Home' ? (
                <HomeBanner 
                    inView={inView} 
                    lang={lang} 
                    className={className} 
                    data={data} 
                    category={category}
                    delay={delay}
                />
            ) : (
                <NormalBanner 
                    inView={inView} 
                    lang={lang} 
                    className={className} 
                    data={data} 
                    category={category}
                    delay={delay}
                />
            )}
        </StyledHeroBanner>
    )
}

export default HeroBanner
