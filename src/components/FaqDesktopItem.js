import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import gsap from 'gsap'

import TextRenderer from './TextRenderer'

const Item = styled.div`
    position: relative;

    width: 100%;

    ${props => props.theme.above.desktop`
        padding-bottom: 50%;

        &:nth-of-type(1) {
            grid-column: 2;

            .front, .back {
                left: initial;
                right: 0;
            }
        }

        &:nth-of-type(4),
        &:nth-of-type(5) {
            .front, .back {
                left: initial;
                right: 0;
            }
        }
    `}
`

const Category = styled.span`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    color: currentColor;

    opacity: 0.6;

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 2);
        font-size: ${props.theme.fontSizes.desktop.s};
    `}
`

const Front = styled.div`
    position: relative;

    width: 50%;
    height: 100%;

    color: ${props => props.theme.colors.light};

    background-color: ${props => props.theme.colors.darkGrey};

    ${props => props.theme.above.desktop`
        position: absolute;
        
        top: 0;
        left: 0;
    `}
`

const FrontInner = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    padding: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(80)};
    `}
`

const Question = styled.p`
    position: relative;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.p};
    line-height: 1.3;

    color: currentColor;

    ${props => props.theme.above.desktop`
        margin-bottom: 0;
        
        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const Back = styled.div`
    position: absolute;
    
    top: 0;
    left: 0;

    width: 50%;
    height: 100%;

    padding: ${props => props.theme.sizes.mobile};

    background-color: ${props => props.theme.colors.darkGrey};

    color: ${props => props.theme.colors.light};

    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(80)};
    `}
`

const Answer = styled(TextRenderer)`
    position: relative;

    width: 100%;

    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.3;

    color: currentColor;

    ${props => props.theme.above.desktop`
        ${props.mobile == 'true' && `
            display: none;
        `}
    `}

    ${props => props.theme.above.desktop`
        width: 75%;

        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const BackgroundWrapper = styled.div`
    position: absolute !important;

    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;
`

const Background = styled(Image)`
    ${props => props.theme.styles.image.objectCover};

    &:after {
        content: '';
        
        ${props => props.theme.styles.element.fill};

        background-color: rgba(16, 16, 16, 0.65);
    }
`

const FaqDesktopItem = ({ 
    className,
    data: {
        question, 
        answer, 
        category, 
        image
    }
}) => {

    const frontRef = useRef(null)
    const frontInnerRef = useRef(null)
    const backRef = useRef(null)
    const backgroundRef = useRef(null)
    const answerRef = useRef(null)

    const [timeline] = useState(new gsap.timeline({ paused: true }))

    useEffect(() => {
        gsap.set(backgroundRef.current, { alpha: 0.0})
        gsap.set(answerRef.current, { y: 15, alpha: 0.0})

        timeline.to(frontInnerRef.current, { y: 15, alpha: 0.0, duration: 0.2, ease: 'sine.out' }, 0.0)
        timeline.to(frontRef.current, { alpha: 0.0, duration: 0.2, ease: 'sine.out' }, 0.0)
        timeline.to(backRef.current, { width: '100%', duration: 0.2, ease: 'power1.inOut' }, 0.0)
        timeline.to(backgroundRef.current, { alpha: 1.0, duration: 0.3, ease: 'sine.out' }, 0.3)
        timeline.to(answerRef.current, { y: 0.0, alpha: 1.0, duration: 0.3, ease: 'sine.out' }, 0.3)
    }, [])

    const mouseEnterHandler = () => {
        timeline.play()
    }

    const mouseLeaveHandler = () => {
        timeline.reverse()
    }

    return (
        <Item className={className} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            <Back ref={backRef} className='back'>
                <BackgroundWrapper ref={backgroundRef}>
                    <Background fluid={image.fluid} alt={image.alt} />
                </BackgroundWrapper>
                <div ref={answerRef}>
                    <Answer data={answer} />
                </div>
            </Back>
            <Front ref={frontRef} className='front'>
                <FrontInner ref={frontInnerRef}>
                    {category && (
                        <Category>{category}</Category>
                    )}
                    <Question>{question}</Question>
                    <Answer data={answer} mobile='true' />
                </FrontInner>
            </Front>
        </Item>
    )
}

export default FaqDesktopItem