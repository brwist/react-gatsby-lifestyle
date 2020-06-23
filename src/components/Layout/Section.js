import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import * as ScrollMagic from 'scrollmagic'
import gsap from 'gsap'
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'

ScrollMagicPluginGsap(ScrollMagic, gsap)

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

    const flowRef = useRef(null)    
    const [ref, inView] = useInView({
        threshold: treshold || 0.5,
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
            const controller = new ScrollMagic.Controller()
            
            const scene = new ScrollMagic.Scene({
                triggerElement: ref.current,
                duration: 2000,
                offset: 900
            })
            .setTween(gsap.to(flowRef.current, { width: '100%' }))
            .addTo(controller)
        }

        
    }, [])

    return (
        <StyledSection 
            ref={ref} 
            name={template}
            backgroundColor={backgroundColor}
            color={getColor(layout.backgroundColor)}
        >
            {layout.flowLine == 'Visible' && <FlowLine ref={flowRef}/>}
            {children(inView)}
        </StyledSection>
    )
}

export default Section
