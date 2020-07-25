import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import stickybits from 'stickybits'

import Scroller from './Scroller'
import HorizontalTitle from './HorizontalTitle'
import Card from './Card'

import theme from './../../styles/theme'

const StyledSection = styled.div`
    position: relative;
    
    /* width: 100%; */
    /* min-height: 100vh; */

    /* overflow: hidden; */

    /* padding: ${props => props.theme.desktopVW(350)} 0; */
`

const StyledTitle = styled(HorizontalTitle)`
    position: absolute;

    ${props => props.type == 'Wave' && `
        margin-bottom: calc(${props.theme.sizes.mobile} * 2);
    `}

    ${props => props.theme.above.desktop`
        ${props.type == 'Wave' && `
            margin-bottom: -${props.theme.desktopVW(50)};
        `}
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
        margin-right: ${props => props.theme.desktopVW(80)};
    }
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

    const titleRef = useRef(null)

    const [x, setX] = useState(0)

    return (
        <StyledSection>
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
            <Scroller getX={e => setX(e)}>
                <CardsContainer>
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