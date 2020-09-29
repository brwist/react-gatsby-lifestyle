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

    ${props => props.hide ? `
        opacity: 0 !important;
    ` : `
        opacity: 1;
    `}
`

const Grain = ({ className, hide }) => {
    const ref = useRef(null)

    useEffect(() => {
        gsap.set(ref.current, { alpha: 0.0 })

        // const tween = gsap.to(ref.current, { alpha: 0.1, delay: 2.0, duration: 1.0 })

        // return () => {
        //     tween && tween.kill()
        // }
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
                    <Wrapper hide={hide || false} ref={ref} className={className}>
                        <BackgroundImage
                            Tag='div'
                            fluid={imageData}
                            className={className}
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

    pointer-events: none;
`

export default StyledGrain