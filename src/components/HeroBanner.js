import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import NormalBanner from './NormalBanner'
import HomeBanner from './HomeBanner'

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

    const bannerRef = useRef(null)
    const { bannerType } = data

    useEffect(() => {

        let vh = window.innerHeight * 0.01
        bannerRef.current.style.setProperty('--vh', `${vh}px`)
    
    }, [])

    return (
        <StyledHeroBanner 
            ref={bannerRef}
            className={className} 
            type={bannerType} 
        >
            {bannerType == 'Home' ? (
                <HomeBanner 
                    inView={inView} 
                    lang={lang} 
                    className={className} 
                    data={data} 
                    category={category} 
                />
            ) : (
                <NormalBanner 
                    inView={inView} 
                    lang={lang} 
                    className={className} 
                    data={data} 
                    category={category} 
                />
            )}
        </StyledHeroBanner>
    )
}

export default HeroBanner
