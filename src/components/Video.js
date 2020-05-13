import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import Image from 'gatsby-image'
import styled from 'styled-components'

const StyledVideo = styled.div`
    position: relative;
`

const Player = styled(ReactPlayer)`
    ${props => props.theme.styles.element.fill};
`

const Placeholder = styled(Image)`
    ${props => props.theme.styles.element.fill};

    pointer-events: none;

    opacity: ${props => props.visible == 'true' ? 1 : 0};
`

const Video = ({
    className,
    url, 
    inView,
    placeholder
}) => {

    const [videoReady, setVideoReady] = useState(false)

    const toggleVideoReady = () => setVideoReady(!videoReady)

    return (
        <StyledVideo className={className}>
            <Player 
                url={url}
                width='100%'
                height='100%'
                // playing={inView}
                onReady={toggleVideoReady}
                muted={true}
            />
            <Placeholder 
                visible={videoReady ? 'false' : 'true'}
                fluid={placeholder.fluid} 
                alt={placeholder.title} 
            />
        </StyledVideo>
    )
}

export default Video
