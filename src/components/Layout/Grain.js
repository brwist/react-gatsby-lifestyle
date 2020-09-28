import React, { useRef, useEffect } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import gsap from 'gsap'

import BackgroundImage from 'gatsby-background-image'

const Wrapper = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    z-index: -1;

    width: 100%;
    height: 100%;
`

const Grain = ({ className }) => {
    const ref = useRef(null)

    useEffect(() => {
        gsap.set(ref.current, { alpha: 0.0 })

        const tween = gsap.to(ref.current, { alpha: 0.15, delay: 1.0, duration: 1.0 })

        return () => {
            tween && tween.kill()
        }
    }, [])

    return (
        <StaticQuery query={graphql`
            query {
                desktop: file(relativePath: { eq: "bg-grain.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 1920, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }`}
            render={data => {
                const imageData = data.desktop.childImageSharp.fluid            
                return (
                    <Wrapper ref={ref}>
                        <BackgroundImage
                            Tag='div'
                            className={className}
                            fluid={imageData}
                            ref={ref}
                        />
                    </Wrapper>
                )
            }}
        />
    )
}

const StyledGrain = styled(Grain)`
    position: absolute;

    top: 0;
    left: 0;
    
    z-index: -1;
    
    width: 100%;
    height: 100%;
  
    background-position: bottom center;
    background-repeat: repeat;
    background-size: auto;

    opacity: 1;
    
    mix-blend-mode: difference;

    pointer-events: none;
`

export default StyledGrain