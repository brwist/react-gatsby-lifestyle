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

const List = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        grid-template-columns: repeat(3, 1fr);
        grid-gap: ${props.theme.desktopVW(120)} ${props.theme.desktopVW(80)};
    `}
`

const StyledItem = styled(Link)``

const ImageWrapper = styled.div`
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
`

const Header = styled.div`
    position: relative;

    ${props => props.theme.styles.flexBox.horCen};

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.desktopVW(24)};
    `}
`

const Heading = styled.h4`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.h5};
    line-height: 1.3;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Description = styled(TextRenderer)`
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);
    
    font-size: ${props => props.theme.fontSizes.mobile.m};

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};

        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const Footer = styled.div`
    ${props => props.theme.styles.flexBox.horCen};
`

const Category = styled.span`
    display: block;
    
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
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
        <StyledItem to={generatePath(lang, `${category.toLowerCase()}/${slug}`)}>
            <ImageWrapper>
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
