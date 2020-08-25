import React, { useRef, useState, useEffect, forwardRef } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'

import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'
import Tags from './Tags'

import { generatePath } from './../utils/helpers'
import TextRenderer from './TextRenderer'

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

const StyledItem = styled.li`
    &:hover {
        img {
            transform: scale(1.05);
        }
    }
`

const ImageWrapper = styled(Link)`
    display: block;
    
    position: relative;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);
    padding-bottom: 116.66%;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const StyledImage = styled(Image)`
    ${props => props.theme.styles.element.fill};

    position: absolute !important;

    img {
        transition: transform 5.0s ease-out !important;
    }
`

const Header = styled.div`
    position: relative;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 2);
    `}
`

const Heading = styled(Link)`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.h5};
    line-height: 1.3;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const StyledTags = styled(Tags)`
    margin-top: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.theme.above.desktop`
        margin-top: calc(${props.theme.sizes.desktop} / 1.5);
    `}
`

const Description = styled(TextRenderer)`
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5) !important;
    
    font-size: ${props => props.theme.fontSizes.mobile.m};

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 1.5) !important;

        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const Footer = styled.div`
    ${props => props.theme.styles.flexBox.horCen};
`

const Category = styled.span`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    opacity: 0.5;
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 3);

        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const Item = React.forwardRef(({ 
    lang, 
    gridCategory,
    data: { 
        title,
        slug,
        category,
        featuredImage,
        buttonLabel,
        excerpt,
        components
    } 
}, ref) => {
    
    // Refs
    const buttonRef = useRef(null)

    let link 

    if (gridCategory == 'Events and Trips') {
        link = `events-and-trips/${category.toLowerCase()}/${slug}`
    } else if (gridCategory == 'Trainers') {
        link = `performance/${category.toLowerCase()}/${slug}`
    } else {
        link = `${category.toLowerCase()}/${slug}`
    }

    return (
        <StyledItem
            ref={ref}
            onMouseEnter={() => buttonRef.current.classList.add('hover')} 
            onMouseLeave={() => buttonRef.current.classList.remove('hover')}
        >
            <ImageWrapper to={generatePath(lang, link)}>
                <StyledImage fluid={featuredImage.fluid} alt={featuredImage.title} />
            </ImageWrapper>
            <Header>
                {gridCategory == 'Events and Trips' && (
                    <Category>{category}</Category>
                )}
                <Heading to={generatePath(lang, link)}>{title}</Heading>
                {gridCategory == 'Careers' && components && components[0].tags && (
                    <StyledTags data={components[0].tags} slice={1}/>
                )}
            </Header>
            {gridCategory != 'Events and Trips' && (
                <Description data={excerpt} />
            )}
            <Footer>
                <ButtonArrow 
                    ref={buttonRef}
                    label={buttonLabel || 'Read more'} 
                    to={generatePath(lang, link)} 
                />
            </Footer>
        </StyledItem>
    )
})

const Grid = ({
    lang,
    inView,
    data: {
        category
    }
}) => {

    // Items
    let items

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
        items = getAllNewsItems()
    } else if (category == 'Careers') {
        items = careerItems.nodes
    } else if (category == 'Trainers') {
        items = trainerItems.nodes
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
                        <Item 
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
