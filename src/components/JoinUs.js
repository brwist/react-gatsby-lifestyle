import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import gsap from 'gsap'

import Container from './Layout/Container'
import Title from './Title'

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: calc(${props => props.theme.sizes.mobile} * 3) ${props => props.theme.sizes.mobile} calc(${props => props.theme.sizes.mobile} * 2);

    ${props => props.theme.above.desktop`
        flex-direction: row;
        
        padding: calc(${props.theme.sizes.desktop} * 10) 0;
    `}
`

const Content = styled(Title)`
    .description {
        font-size: ${props => props.theme.fontSizes.mobile.p};
        line-height: 1.3;
    }

    ${props => props.theme.above.desktop`
        margin-right: calc(${props.theme.sizes.desktop} * 4);
        
        .description-wrapper {
            max-width: ${props.theme.desktopVW(480)};
        }

        .description {
            font-size: ${props.theme.fontSizes.desktop.h6};
        }
    `}
`

const ImageWrapper = styled.div`
    width: ${props => props.theme.mobileVW(500)};
    height: ${props => props.theme.mobileVW(500)};

    background-color: ${props => props.theme.colors.darkGrey};

    ${props => props.theme.below.desktop`
        display: none;
    `}

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(500)};
        height: ${props.theme.desktopVW(500)};
    `}
`

const StyledImage = styled(Image)`
    ${props => props.theme.styles.image.objectCover};
`

const JoinUs = ({
    lang,
    inView,
    data: {
        contentTitle,
        contentDescription,
        image
    }
}) => {

    const titleRef = useRef(null)

    useEffect(() => {
        
        if (!inView) return

        const timeline = new gsap.timeline()
        timeline.add(titleRef.current.transitionIn(), 0)
        
        return () => {
            timeline && timeline.kill()
        }

    }, [inView])

    return (
        <Wrapper>
            <Content
                lang={lang}
                title={contentTitle}
                description={contentDescription}
                size='medium'
                ref={titleRef}
            />
            <ImageWrapper>
                <StyledImage fluid={image.fluid} alt={image.alt} />
            </ImageWrapper>
        </Wrapper>
    )
}

export default JoinUs
