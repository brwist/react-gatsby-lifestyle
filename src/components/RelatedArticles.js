import React, { useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'

import GridItem from './GridItem'
import Container from './Layout/Container'
import HorizontalTitle from './Horizontal/HorizontalTitle'

const Wrapper = styled.section`
    padding: calc(${props => props.theme.sizes.mobile} * 5) 0;

    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 10) 0;
    `}
`

const StyledTitle = styled(HorizontalTitle)`
    padding-left: 0;

    .title-container {
        padding: 0;
    }

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} * 3);
    `}
`

const List = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        grid-template-columns: repeat(3, 1fr);
        grid-gap: ${props.theme.desktopVW(120)} ${props.theme.desktopVW(80)};
    `}
`

const RelatedArticles = ({
    className,
    lang,
    data
}) => {

    // Refs
    const titleRef = useRef(null)
    const itemRefs = useRef([])

    return (
        <Wrapper>
            <Container>
                <StyledTitle 
                    ref={titleRef}
                    lang={lang}
                    inView={true}
                    title={{
                        words: ["Related", "Articles"]
                    }} 
                    size='normal'
                />
                <List className={className}>
                    {data.map((item, i) => (
                        <GridItem 
                            key={i} 
                            lang={lang} 
                            data={item} 
                            gridCategory='Events and Trips' 
                            ref={el => itemRefs.current[i] = el}
                        />
                    ))}
                </List>
            </Container>
        </Wrapper>
    )
}

export default RelatedArticles
