import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'

import Container from './Layout/Container'
import GridItem from './GridItem'

const Wrapper = styled.div`
    padding: calc(${props => props.theme.sizes.mobile} * 5) 0;

    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 10) 0;
    `}
`

const Filter = styled.div`
    display: none;
    
    margin-bottom: ${props => props.theme.mobileVW(80)};

    ${props => props.theme.above.desktop`
        display: block;

        margin-bottom: ${props.theme.desktopVW(80)};
    `}
`

const FilterItem = styled.button`
    display: inline-block;
    vertical-align: middle;

    margin-right: ${props => props.theme.desktopVW(30)};

    font-size: 1.2rem;

    color: ${props => props.theme.colors.white};

    cursor: pointer;

    transition: opacity 0.25s ease-out;

    ${props => props.active ? `
        opacity: 1;
    `: `
        opacity: 0.25;

        &:hover {
            opacity: 0.5;
        }
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

const Grid = ({
    lang,
    inView,
    data: {
        items,
        category,
        gridCategory
    }
}) => {

    // Items
    let gridItems

    // States
    const [activeNewsItems, setActiveNewsItems] = useState(-1)
    const [filteredItems, setFilteredItems] = useState([])

    // Refs
    const itemRefs = useRef([])

    const { 
        newsItems,
        trainerItems, 
        careerItems 
    } = useStaticQuery(graphql`{
        newsItems: allContentfulArticle(filter: {
            category: {
                in: ["News", "Events", "Trips", "Knowledge"]
            }
        }, sort: {
            order: DESC, 
            fields: createdAt
        }) {
            group(field: category) {
                field
                fieldValue
                nodes {
                    slug
                    category
                    name
                    title
                    featuredImage {
                        title
                        fluid(maxWidth: 400, quality: 100) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
                }
            }
          },
        trainerItems: allContentfulPage(filter: {
            category: {
                eq: "Trainers"
            }
        }, sort: {
            order: DESC, 
            fields: createdAt
        }) {
            nodes {
                name
                title: name
                category
                slug
                featuredImage {
                    title
                    fluid(maxWidth: 400, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
        },
        careerItems: allContentfulArticle(filter: {
            category: {
                eq: "Careers"
            }
        }, sort: {
            order: DESC, 
            fields: createdAt
        }) {
            nodes {
                slug
                    category
                    name
                    title
                    featuredImage {
                        title
                        fluid(maxWidth: 400, quality: 100) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
            }
        }
    }`)

    const getAllNewsItems = () => {
        let allNews = []
        newsItems.group.forEach(group => {
            group.nodes.forEach(node => allNews.push(node))
        })
        return allNews
    }

    if (category == 'Events and Trips') {
        gridItems = getAllNewsItems()
    } else if (category == 'Careers') {
        gridItems = careerItems.nodes
    } else if (category == 'Trainers') {
        gridItems = trainerItems.nodes
    } 

    useEffect(() => {
        if (activeNewsItems == -1) {
            let items = []

            newsItems.group.forEach(group => {
                group.nodes.forEach(node => items.push(node))
            })
            
            setFilteredItems(items)
        } else {
            setFilteredItems(newsItems.group[activeNewsItems].nodes)
        }
    }, [activeNewsItems])

    useEffect(() => {

        itemRefs.current.forEach((item, i) => {
            gsap.fromTo(item, { y: 25.0, alpha: 0.0 }, { y: 0.0, alpha: 1.0, delay: i * 0.25, duration: 0.5, ease: 'sine.out' })
        })
        
    }, [filteredItems])

    return (
        <Wrapper>
            <Container>
                {category == 'Events and Trips' && (
                    <Filter>
                        <FilterItem 
                            onClick={() => setActiveNewsItems(-1)}
                            active={activeNewsItems == -1}
                        >All categories</FilterItem>
                        {newsItems.group.map((category, i) => {
                            return (
                                <FilterItem
                                    key={i}
                                    active={activeNewsItems == i}
                                    onClick={() => setActiveNewsItems(i)}
                                >{category.fieldValue}</FilterItem>
                            )
                        })}
                    </Filter>
                )}
                <List>
                    {filteredItems.map((item, i) => (
                        <GridItem 
                            key={i} 
                            lang={lang} 
                            data={item} 
                            gridCategory={category} 
                            ref={el => itemRefs.current[i] = el}
                        />
                    ))}
                </List>
            </Container>
        </Wrapper>
    )
}

export default Grid
