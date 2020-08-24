import React, { useEffect, useContext, useRef } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import gsap, { timeline } from 'gsap'
import { useInView } from 'react-intersection-observer'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Title from './Title'
import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'
import UpcomingItem from './UpcominigItem'

import theme from './../styles/theme.js'

import { generatePath } from '../utils/helpers'

const Wrapper = styled.div`
    padding: calc(${props => props.theme.sizes.mobile} * 3) 0;
    
    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 5) 0 calc(${props.theme.sizes.desktop} * 10) 0;
    `}
`

const StyledContainer = styled(Container)`
    ${props => props.theme.above.desktop`
        max-width: ${props.theme.breakpoints.wide}px;
    `}
`

const Grid = styled.ul`
    ${props => props.theme.below.desktop`
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: calc(${props => props.theme.sizes.mobile} * 3);

        margin-bottom: calc(${props => props.theme.sizes.mobile} * 3);
    `}

    ${props => props.theme.above.desktop`
        display: flex;
        flex-wrap: wrap;
    `}
`

const Header = styled(Title)`
    .title-wrapper {
        margin-left: 0;
    }

    ${props => props.theme.below.desktop`
        margin-bottom: calc(${props => props.theme.sizes.mobile} * 3);
    `}

    ${props => props.theme.above.desktop`
        position: absolute;

        top: ${props.theme.desktopVW(150)};
        left: 50%;

        width: 50%;
    `}
`

const Description = styled(Title)`
    text-align: left;

    .description-wrapper {
        max-width: ${props => props.theme.mobileVW(380)};

        margin-left: 0;
    }

    .button {
        background-color: ${props => props.theme.colors.dark};

        border-color: ${props => props.theme.colors.dark}; 
        
        color: ${props => props.theme.colors.dark};
        
        &:hover {
            background-color: transparent;

            border-color: ${props => props.theme.colors.dark}; 
            
            color: ${props => props.theme.colors.dark};
        }
    }

    ${props => props.theme.above.desktop`
        .description-wrapper {
            max-width: ${props.theme.desktopVW(380)};
        }
    `}
`

const Upcoming = ({
    lang, 
    inView, 
    backgroundColor,
    data: {
        contentTitle,
        contentDescription
    }
}) => {

    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    const [descriptionWrapperRef, descriptionWrapperInView] = useInView({
        threshold: 0,
        triggerOnce: true
    })

    useEffect(() => {
        
        if (!inView) return

        const timeline = new gsap.timeline()
        
        timeline.add(titleRef.current.transitionIn(), 0)
        
        return () => {
            timeline && timeline.kill()
        }

    }, [inView])

    useEffect(() => {

        if (!descriptionWrapperInView) return
        
        const timeline = new gsap.timeline()

        timeline.add(descriptionRef.current.transitionIn(), 0)
        
        return () => {
            timeline && timeline.kill()
        }
    }, [descriptionWrapperInView])

    const { latestItems } = useStaticQuery(graphql`{
        latestItems: allContentfulArticle(filter: {
            category: {
                in: ["News", "Events", "Trips", "Knowledge"]
            }
        }, sort: {
            order: DESC, 
            fields: createdAt
        }, limit: 4) {
            nodes {
                ...ArticleQuery
            }
        }
    }`)
    
    return (
        <Wrapper>
            <StyledContainer>
                <Header 
                    ref={titleRef}
                    lang={lang} 
                    title={contentTitle} 
                    size='normal'
                    overlayColor={backgroundColor}
                />
                <Grid>
                    {latestItems.nodes.map((item, index) => (
                        <UpcomingItem
                            key={index} 
                            data={item} 
                            lang={lang} 
                            overlayColor={backgroundColor}
                        />
                    ))}
                </Grid>
                <div ref={descriptionWrapperRef}>
                    <Description 
                        lang={lang} 
                        ref={descriptionRef}
                        description={contentDescription}
                    />
                </div>
            </StyledContainer>
        </Wrapper>
    )
}

export default Upcoming
