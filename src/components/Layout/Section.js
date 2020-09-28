import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { useWindowSize } from 'react-use'
import gsap from 'gsap'

import theme from './../../styles/theme'
import FlowLine from './../FlowLine'
import Grain from './Grain'

const StyledSection = styled.section`
    position: relative;

    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
`

const Section = ({ 
    children, 
    treshold,
    name,
    layout
}) => {

    const { width: windowWidth } = useWindowSize()
    const flowRef = useRef(null)    
    
    const [ref, inView] = useInView({
        threshold: windowWidth < 1023 ? 0 : 0.3,
        triggerOnce: true
    })

    const getBackgroundColor = (color) => {
        switch (color) {
            case 'Grey': return theme.colors['light']
            case 'White': return theme.colors['white']
            case 'Black': return 'transparent'
            default: return 'transparent'
        }
    }

    const getColor = (color) => {
        switch (color) {
            case 'Grey': return theme.colors['dark']
            case 'Black': return theme.colors['light']
            case 'White': return theme.colors['dark']
            default: return theme.colors['white']
        }
    }

    const getGrain = () => {
        if (layout.backgroundColor == 'undefined' || layout.backgroundColor == undefined || layout.backgroundColor == 'Black') {
            return <Grain />
        }
    }

    let template = name.replace('ContentfulComponent', '')
    let backgroundColor = template == 'HeroBanner' ? 'transparent' : getBackgroundColor(layout.backgroundColor)

    useEffect(() => {

        if (layout.flowLine == 'Visible') {
            
            const tl = gsap.timeline({ paused: true })
            tl.from(flowRef.current, { width: 0 })
    
            let requestId
            const startY = flowRef.current.clientHeight / 2
            const finishDistance = flowRef.current.clientHeight

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

        }

    }, [])

    useEffect(() => {

        if (!flowRef.current) return
        
        gsap.set(flowRef.current, { alpha: 0.0 })
        
        if (!inView) return

        const tween = gsap.to(flowRef.current, { alpha: 1.0, duration: 1.0, delay: 1.0, ease: 'sine.out' })

        return () => {
            tween && tween.kill()
        }
    }, [inView])

    return (
        <StyledSection 
            ref={ref} 
            name={template}
            backgroundColor={backgroundColor}
            color={getColor(layout.backgroundColor)}
        >
            {layout.flowLine == 'Visible' && <FlowLine ref={flowRef}/>}
            {children(inView)}
            {getGrain()}
        </StyledSection>
    )
}

export default Section
