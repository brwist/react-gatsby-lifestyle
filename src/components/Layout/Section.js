import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

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
    
    const [ref, inView] = useInView({
        threshold: treshold || 0.15,
        triggerOnce: true
    })

    const getBackgroundColor = (color) => {
        switch (color) {
            case 'Grey': return theme.colors['light']
            case 'Black': return theme.colors['dark']
            case 'White': return theme.colors['white']
            default: return theme.colors['dark']
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

    return (
        <StyledSection 
            ref={ref} 
            name={template}
            backgroundColor={backgroundColor}
            color={getColor(layout.backgroundColor)}
        >
            {getGrain()}
            {layout.flowLine == 'Visible' && <FlowLine inView={inView}/>}
            {children(inView)}
        </StyledSection>
    )
}

export default Section
