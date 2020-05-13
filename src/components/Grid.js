import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { Link } from 'gatsby'

import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'

import { generatePath } from './../utils/helpers'

const Wrapper = styled(Container)`
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

const ImageWrapper = styled.div`
    position: relative;

    margin-bottom: ${props => props.theme.sizes.desktop};
    padding-bottom: 116.66%;
`

const StyledImage = styled(Image)`
    ${props => props.theme.styles.element.fill};

    position: absolute !important;
`

const Title = styled.h4`
    display: block;

    margin-bottom: ${props => props.theme.sizes.desktop};

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.h5};
    line-height: 1.3;
`

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

const Item = ({ lang, data: { name, slug, category, featuredImage } }) => {
    return (
        <StyledItem>
            <ImageWrapper>
                <StyledImage fluid={featuredImage.fluid} alt={featuredImage.title} />
            </ImageWrapper>
            <Title>{name}</Title>
            <Footer>
                <ButtonArrow label='Read more' to={generatePath(lang, slug)} />
                <Category>{category}</Category>
            </Footer>
        </StyledItem>
    )
}

const Grid = ({
    lang,
    inView,
    data
}) => {
    const { category, items } = data

    console.log(items);

    return (
        <Wrapper>
            <Filter>All categories</Filter>
            <List>
                {items.map((item, i) => <Item key={i} lang={lang} data={item} />)}
            </List>
            {/* {isFetching && 'Fetching more list items...'} */}
        </Wrapper>
    )
}

export default Grid
