import React from 'react'
import styled, { css } from 'styled-components'

import InstagramSvg from './../images/graphics/instagram.svg'
import FacebookSvg from './../images/graphics/facebook.svg'

const Wrapper = styled.a`
    display: inline-block;
    vertical-align: middle;

    width: ${props => props.theme.mobileVW(18)};
    height: ${props => props.theme.mobileVW(18)};

    overflow: hidden;

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(24)};
        height: ${props.theme.desktopVW(24)};

        &:hover {
            .inner {
                transform: translateY(0);
            }
        }
    `}
`

const Inner = styled.div`
    display: block;

    position: relative;

    transition: transform 0.25s ease-out;

    ${props => props.theme.above.desktop`
        transform: translateY(-${props.theme.desktopVW(40)});
    `}
`

const IconStyles = css`
    width: 100%;
    height: 100%;

    ${props => props.theme.below.desktop`
        &.active {
            display: none;
        }
    `}

    ${props => props.theme.above.desktop`
        &.active {
            path {
                fill: ${props.theme.colors.orange};
            }
        }

        &:first-of-type {
            margin-bottom: ${props.theme.desktopVW(15)};
        }
    `}
`

const StyledInstagram = styled(InstagramSvg)`
   ${IconStyles}
`

const StyledFacebook = styled(FacebookSvg)`
   ${IconStyles}
`

const AnimatedIcon = ({
    className,
    facebook,
    instagram
}) => {
    return (
        <Wrapper className={className} href={instagram || facebook} target='_blank'>
            <Inner className='inner'>
                {facebook && (
                    <>
                        <StyledFacebook className='active' />
                        <StyledFacebook />
                    </>
                )}
                {instagram && (
                    <>
                        <StyledInstagram className='active' />
                        <StyledInstagram />
                    </>
                )}
            </Inner>
        </Wrapper>
    )
}

export default AnimatedIcon
