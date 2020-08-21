import React, { useRef } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'

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

const Filter = styled.span`
    display: none;
    
    margin-bottom: ${props => props.theme.mobileVW(80)};

    ${props => props.theme.above.desktop`
        display: block;

        margin-bottom: ${props.theme.desktopVW(80)};
    `}
`

const FilterItem = styled.span`
    display: inline-block;
    vertical-align: middle;

    margin-right: ${props => props.theme.desktopVW(30)};

    font-size: 1.2rem;

    &:not(:first-of-type) {
        opacity: 0.25;
    }
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

const Item = ({ 
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
}) => {
    
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
}

const Grid = ({
    lang,
    inView,
    data
}) => {

    let items

    const { 
        category, 
        filterable 
    } = data

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
            nodes {
                ...ArticleQuery
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
                ...PageQuery
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
                ...ArticleQuery
            }
        }
    }`)

    if (category == 'Events and Trips') {
        items = newsItems.nodes
    } else if (category == 'Careers') {
        items = careerItems.nodes
    } else if (category == 'Trainers') {
        items = trainerItems.nodes
    }

    return (
        <Wrapper>
            <Container>
                {filterable && (
                    <Filter>
                        <FilterItem>All categories</FilterItem>
                        <FilterItem>Trips</FilterItem>
                        <FilterItem>Events</FilterItem>
                        <FilterItem>Brainfood</FilterItem>
                    </Filter>
                )}
                {items && items.length > 0 && (
                    <List>
                        {items.map((item, i) => (
                            <Item 
                                key={i} 
                                lang={lang} 
                                data={item} 
                                gridCategory={category} 
                            />
                        ))}
                    </List>
                )}
            </Container>
            {/* {isFetching && 'Fetching more list items...'} */}
        </Wrapper>
    )
}

export default Grid
