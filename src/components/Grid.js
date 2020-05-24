import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { Link } from 'gatsby'

import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'
import Tags from './Tags'

import { generatePath } from './../utils/helpers'
import TextRenderer from './TextRenderer'

const Wrapper = styled.div`
    padding: calc(${props => props.theme.sizes.desktop} * 10) 0;
`

const Filter = styled.div`
    margin-bottom: ${props => props.theme.desktopVW(80)};
`

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${props => props.theme.desktopVW(120)} ${props => props.theme.desktopVW(80)};
`

const StyledItem = styled.li`

`

const ImageWrapper = styled(Link)`
    display: block;
    
    position: relative;

    margin-bottom: ${props => props.theme.sizes.desktop};
    padding-bottom: 116.66%;
`

const StyledImage = styled(Image)`
    ${props => props.theme.styles.element.fill};

    position: absolute !important;
`

const Header = styled.div`
    position: relative;

    ${props => props.theme.styles.flexBox.horCen};

    margin-bottom: ${props => props.theme.desktopVW(24)};
`

const Heading = styled.h4`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.h5};
    line-height: 1.3;
`

const Description = styled(TextRenderer)``

const Footer = styled.div`
    ${props => props.theme.styles.flexBox.horCen};
`

const Category = styled.span`
    display: block;
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.desktop.m};
    line-height: 1.5;

    text-transform: uppercase;
`

const Item = ({ 
    lang, 
    gridCategory,
    data: { 
        name,
        slug,
        category,
        featuredImage,
        buttonLabel,
        excerpt,
        components
    } 
}) => {
    return (
        <StyledItem>
            <ImageWrapper to={generatePath(lang, `${category.toLowerCase()}/${slug}`)}>
                <StyledImage fluid={featuredImage.fluid} alt={featuredImage.title} />
            </ImageWrapper>
            <Header>
                <Heading>{name}</Heading>
                {gridCategory == 'Careers' && components && components[0].tags && (
                    <Tags data={components[0].tags} slice={1}/>
                )}
            </Header>
            {gridCategory != 'News & Events' && (
                <Description data={excerpt} />
            )}
            <Footer>
                <ButtonArrow label={buttonLabel || 'Read more'} to={generatePath(lang, `${category.toLowerCase()}/${slug}`)} />
                {gridCategory == 'News & Events' && (
                    <Category>{category}</Category>
                )}
            </Footer>
        </StyledItem>
    )
}

const Grid = ({
    lang,
    inView,
    data
}) => {

    const { category, items, filterable } = data

    return (
        <Wrapper>
            <Container>
                {filterable && <Filter>All categories</Filter>}
                <List>
                    {items.map((item, i) => <Item key={i} lang={lang} data={item} gridCategory={category} />)}
                </List>
            </Container>
            {/* {isFetching && 'Fetching more list items...'} */}
        </Wrapper>
    )
}

export default Grid
