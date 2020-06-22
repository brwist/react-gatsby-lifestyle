import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

const Grain = ({ className }) => (
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
                <BackgroundImage
                    Tag='div'
                    className={className}
                    fluid={imageData}
                />
            )
        }}
    />
)

const StyledGrain = styled(Grain)`
    position: absolute !important;

    top: 0;
    left: 0;
    
    z-index: 0;
    
    width: 100%;
    height: 100%;
  
    background-position: bottom center;
    background-repeat: repeat;
    background-size: auto;

    opacity: 0.1 !important;
    
    mix-blend-mode: difference;

    pointer-events: none;
`

export default StyledGrain