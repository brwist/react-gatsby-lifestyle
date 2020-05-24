import React from 'react'
import styled from 'styled-components'

import Scroller from './Scroller'
import HorizontalTitle from './HorizontalTitle'
import Card from './Card'

const StyledSection = styled.div`
    position: relative;
    
    width: 100%;
    min-height: 100vh;

    padding: ${props => props.theme.desktopVW(350)} 0;
`

const StyledHorizontalTitle = styled(HorizontalTitle)`
    position: sticky;
    
    top: 0;
    left: 0;

    width: 100%;
    height: auto;
    
    padding-top: ${props => props.theme.desktopVW(80)};
`

const CardsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    
    position: relative;
    
    height: 100%;
    
    padding: 0 0 0 80px;
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
    description
}) => {
    return (
        <StyledSection>
            {/* <StyledHorizontalTitle 
                lang={lang}
                title={title} 
                description={description} 
                size='normal' 
            /> */}
            <Scroller>
                <CardsContainer>
                    {items.map((item, i) => {
                        return (
                            <StyledCard
                                key={i}
                                lang={lang}
                                data={item}
                                component={component}
                                information={information}
                                type={type}
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