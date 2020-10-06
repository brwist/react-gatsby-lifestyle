import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import Image from 'gatsby-image'
import styled, { css } from 'styled-components'
import { useWindowSize } from 'react-use'

import PlayPauseSvg from './../images/graphics/play-pause.svg'

const Wrapper = styled.div`
    position: relative;

    ${props => props.theme.above.desktop`
        width: 100%;
        height: 100%;
    `}
`

const Overlay = styled.button`
    ${props => props.theme.styles.element.fill};

    cursor: pointer;
`

const StyledVideo = styled.div`
    ${props => props.theme.below.desktop`
        position: relative;

        padding-top: 56.25%;
    `}

    ${props => props.theme.above.desktop`
        position: absolute;

        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        width: calc(${props.theme.desktopVW(720)} * 2);
        height: 100%;
    `}
`

const Player = styled(ReactPlayer)`
    ${props => props.theme.below.desktop`
        position: absolute;
        
        top: 0;
        left: 0;

        width: 100%;
    `}
`

const ImageStyles = css`
    ${props => props.theme.styles.element.fill};

    pointer-events: none;

    opacity: ${props => props.visible == 'true' ? 1 : 0};
`

const FluidImage = styled(Image)`
    ${ImageStyles}
`

const StaticImage = styled.img`
    ${ImageStyles}
`

const Controls = styled.div`
    position: absolute;

    bottom: calc(${props => props.theme.sizes.mobile} / 2);
    left: 0;

    width: 100%;

    padding: 0 calc(${props => props.theme.sizes.mobile} / 2);
    
    ${props => props.theme.above.desktop`
        bottom: ${props.theme.sizes.desktop};

        padding: 0 ${props.theme.sizes.desktop};
    `}
`

const PlayPause = styled.button`
    cursor: pointer;
`

const Icon = styled(PlayPauseSvg)`
    width: ${props => props.theme.mobileVW(20)};
    height: ${props => props.theme.mobileVW(25)};

    rect, polygon {
        fill: ${props => props.theme.colors.light};
    }

    ${props => props.playing == 'true' ? `
        .pause {
            display: block;
        }

        .play {
            display: none;
        }
    ` : `
        .pause {
            display: none;
        }

        .play {
            display: block;
        }
    `}

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(25)};
        height: ${props.theme.desktopVW(20)};
    `}
`

const Video = ({
    className,
    url, 
    inView,
    placeholder,
    title,
    inline
}) => {

    const [videoReady, setVideoReady] = useState(false)
    const [videoPlaying, setVideoPlaying] = useState(false)

    const toggleVideoReady = () => setVideoReady(!videoReady)

    return (
        <Wrapper className={className}>
            <StyledVideo className='video'>
                <Player 
                    url={url}
                    width='100%'
                    height='100%'
                    playing={videoPlaying}
                    onReady={toggleVideoReady}
                    // muted={videoPlaying ? false : true}
                    volume={videoPlaying ? 1 : 0}
                />
            </StyledVideo>
            <Overlay onClick={() => setVideoPlaying(!videoPlaying)}></Overlay>
            <Controls>
                <PlayPause onClick={() => setVideoPlaying(!videoPlaying)}>
                    <Icon playing={videoPlaying.toString()}/>
                </PlayPause>
            </Controls>
        </Wrapper>
    )
}

export default Video
