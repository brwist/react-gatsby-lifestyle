import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

import theme from './../../styles/theme'
import FlowLine from './../FlowLine'

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
        threshold: treshold || 0.5
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

    return (
        <StyledSection 
            ref={ref} 
            name={name.replace('ContentfulComponent', '')}
            backgroundColor={getBackgroundColor(layout.backgroundColor)}
            color={getColor(layout.backgroundColor)}
        >
            {layout.flowLine == 'Visible' && <FlowLine />}
            {children(inView)}
        </StyledSection>
    )
}

export default Section
