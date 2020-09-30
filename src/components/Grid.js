import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'

import Container from './Layout/Container'
import GridItem from './GridItem'

const Wrapper = styled.div`
    padding: ${props => props.theme.sizes.mobile} 0;

    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 5) 0 calc(${props.theme.sizes.desktop} * 10) 0;
    `}
`

const Filter = styled.div`
    display: none;
    
    margin-bottom: ${props => props.theme.mobileVW(80)};

    overflow: hidden;

    ${props => props.theme.above.desktop`
        display: block;

        margin-bottom: ${props.theme.desktopVW(80)};
    `}
`

const FilterInner = styled.div``

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

    // States
    const [activeNewsItems, setActiveNewsItems] = useState(-1)
    const [filteredItems, setFilteredItems] = useState([])

    // Refs
    const itemRefs = useRef([])
    const filterRef = useRef(null)

    const { 
        eventsAndTripsItems,
        blogItems,
        trainerItems, 
        careerItems 
    } = useStaticQuery(graphql`{
        eventsAndTripsItems: allContentfulArticle(filter: {
            category: {
                in: ["Events", "Trips"]
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
        blogItems: allContentfulArticle(filter: {
            category: {
                in: ["News", "Recipes", "Knowledge"]
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
            order: ASC, 
            fields: slug
        }) {
            nodes {
                name
                title: name
                category
                slug
                excerpt {
                    json
                }
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
                    excerpt {
                        json
                    }
                    featuredImage {
                        title
                        fluid(maxWidth: 400, quality: 100) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
            }
        }
    }`)
    
    let categoryItems
    let showFilter = false

    if (category == 'Events and Trips') {
        categoryItems = eventsAndTripsItems
        showFilter = true
    } else if (category == 'Blog') {
        categoryItems = blogItems
        showFilter = true
    }

    useEffect(() => {

        if (category == 'Careers') {
            setFilteredItems(careerItems.nodes)
        } else if (category == 'Trainers') {
            setFilteredItems(trainerItems.nodes)
        }

    }, [])

    useEffect(() => {

        if (category == 'Careers' || category == 'Trainers') return

        if (activeNewsItems == -1) {
            let items = []

            categoryItems.group.forEach(group => {
                group.nodes.forEach(node => items.push(node))
            })
            
            setFilteredItems(items)
        } else {
            setFilteredItems(categoryItems.group[activeNewsItems].nodes)
        }
        
    }, [activeNewsItems])

    useEffect(() => {

        if (!showFilter || !inView) return

        itemRefs.current.forEach((item, i) => {
            if (item) gsap.fromTo(item, { y: 25.0, alpha: 0.0 }, { y: 0.0, alpha: 1.0, delay: i * 0.25, duration: 0.5, ease: 'sine.out' })
        })
        
    }, [filteredItems])

    useEffect(() => {
        
        gsap.set(filterRef.current, { x: -25.0, alpha: 0.0 })

        itemRefs.current.forEach(item => {
            gsap.set(item, { y: 25.0, alpha: 0.0 })
        })
        
        if (!inView) return

        gsap.to(filterRef.current, { x: 0.0, alpha: 1.0, transformOrigin: 'left', ease: 'power3.out' })
        
        itemRefs.current.forEach((item, i) => {
            gsap.fromTo(item, { y: 25.0, alpha: 0.0 }, { y: 0.0, alpha: 1.0, delay: i * 0.25, duration: 0.5, ease: 'sine.out' })
        })

    }, [inView])

    return (
        <Wrapper>
            <Container>
                {showFilter && (
                    <Filter>
                        <FilterInner ref={filterRef}>
                            <FilterItem 
                                onClick={() => setActiveNewsItems(-1)}
                                active={activeNewsItems == -1}
                            >All categories</FilterItem>
                            {categoryItems.group.map((category, i) => {
                                return (
                                    <FilterItem
                                        key={i}
                                        active={activeNewsItems == i}
                                        onClick={() => setActiveNewsItems(i)}
                                    >{category.fieldValue}</FilterItem>
                                )
                            })}
                        </FilterInner>
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
