import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import stickybits from 'stickybits'
import gsap from 'gsap'

import Scroller from './Scroller'
import HorizontalTitle from './HorizontalTitle'
import Card from './Card'
import FlowLine from './../FlowLine'

import theme from './../../styles/theme'

const StyledSection = styled.div`
    position: relative;
`

const StyledTitle = styled(HorizontalTitle)`
    width: ${props => props.theme.mobileVW(750)};

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(750)};
    `}
`

const CardsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    
    position: relative;
    
    height: 100%;
    
    padding: 0 10vh;
`

const StyledCard = styled(Card)`
    &:not(:last-of-type) {
        margin-right: ${props => props.theme.desktopVW(160)};
    }
`

const FlowWrapper = styled.div`
    opacity: 0;
`

const HorizontalScroll = ({
    lang, 
    inView,
    items,
    type,
    slug,
    information,
    component,
    title, 
    description,
    backgroundColor
}) => {

    // Refs
    const titleRef = useRef(null)
    const flowWrapperRef = useRef(null) 
    const flowRef = useRef(null) 
    const containerRef = useRef(null) 

    useEffect(() => {
        
        stickybits(flowWrapperRef.current, {
            verticalPosition: 'top'
        })

    }, [])

    useEffect(() => {

        const tl = gsap.timeline({ paused: true })
        
        tl.from(flowRef.current, { width: 0.0 })
        tl.to(flowWrapperRef.current, { alpha: 0.0, delay: 1.0 })

        let requestId
        const startY = containerRef.current.clientHeight
        const finishDistance = containerRef.current.clientHeight * 2

        const update = () => {
            tl.progress((scrollY - startY) / finishDistance)
            requestId = null
        }

        const scrollHandler = () => {
            if (!requestId) {
                requestId = requestAnimationFrame(update)
            }
        }

        document.addEventListener('scroll', scrollHandler)

    }, [])

    useEffect(() => {
        
        if (!inView) return

        const tween = gsap.to(flowWrapperRef.current, { alpha: 1.0, duration: 1.0, delay: 1.0, ease: 'sine.out' })

        return () => {
            tween && tween.kill()
        }
    }, [inView])

    return (
        <StyledSection>
            <FlowWrapper ref={flowWrapperRef}>
                <FlowLine ref={flowRef} />
            </FlowWrapper>
            <Scroller>
                <CardsContainer ref={containerRef}>
                    <StyledTitle 
                        ref={titleRef}
                        lang={lang}
                        inView={inView}
                        type={type}
                        title={title} 
                        description={description} 
                        overlayColor={backgroundColor}
                        size='normal'
                        useInlineLink={true}
                    />
                    {items.map((item, i) => {
                        return (
                            <StyledCard
                                key={i}
                                lang={lang}
                                data={item}
                                inView={inView}
                                component={component}
                                information={information}
                                type={type}
                                overlayColor={backgroundColor}
                                active={item.slug != slug || component == 'InstagramFeed'}
                            />
                        )
                    })}
                </CardsContainer>
            </Scroller>
        </StyledSection>
    )
}

export default HorizontalScroll