import React, { useContext } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Title from './Title'
import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'

import { DictionaryContext } from './../contexts/dictionary'
import { generatePath } from '../utils/helpers'

const Wrapper = styled.div`
    max-width: ${props => props.theme.breakpoints.wide}px;
    padding: calc(${props => props.theme.sizes.desktop} * 5) 0 calc(${props => props.theme.sizes.desktop} * 10) 0;
`

const Grid = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const Header = styled(Title)`
    position: absolute;

    top: ${props => props.theme.desktopVW(250)};
    left: 50%;

    width: 50%;

    .heading {
        margin-left: 0;
    }
`

const Description = styled(Title)`
    .description-wrapper {
        max-width: ${props => props.theme.desktopVW(380)};

        margin-left: 0;
    }
`

const StyledItem = styled.li`
    width: 50%;

    &:nth-of-type(2),
    &:nth-of-type(3) {
        margin-top: ${props => props.theme.desktopVW(500)};

        .inner {
            width: ${props => props.theme.desktopVW(400)};
        }

        .image-wrapper {
            height: ${props => props.theme.desktopVW(560)};
        }
    }

    &:nth-of-type(3) {
        margin-top: -${props => props.theme.desktopVW(100)};
    }

    &:nth-of-type(4) {
        margin-top: ${props => props.theme.desktopVW(200)};
        margin-bottom: calc(${props => props.theme.sizes.desktop} * 5);

        .inner {
            width: ${props => props.theme.desktopVW(720)};
        }

        .image-wrapper {
            height: ${props => props.theme.desktopVW(640)};
        }
    }
`

const Inner = styled.div`
    width: ${props => props.theme.desktopVW(560)};
`

const ImageWrapper = styled.div`
    display: block;

    width: 100%;
    height: ${props => props.theme.desktopVW(640)};

    margin-bottom: ${props => props.theme.sizes.desktop};
`

const StyledImage = styled(Img)`
    ${props => props.theme.styles.image.objectCover};
`

const Name = styled.h4`
    display: block;
    
    margin-bottom: ${props => props.theme.sizes.desktop};

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.desktop.h5};
    line-height: 1.2;
`

const Info = styled.div`
    ${props => props.theme.styles.flexBox.horCen};
`

const Category = styled.span`
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.desktop.m};
    line-height: 1.5;

    text-transform: uppercase;
`

const Item = ({
    lang,
    data: {
        name,
        slug, 
        category,
        featuredImage
    }
}) => {
    return (
        <StyledItem>
            <Inner className='inner'>
                <ImageWrapper className='image-wrapper'>
                    {featuredImage && <StyledImage fluid={featuredImage.fluid} alt={featuredImage.title} objectFit='cover'/>}
                </ImageWrapper>
                <Name>{name}</Name>
                <Info>
                    <ButtonArrow label='Read more' to={generatePath(lang, slug)}/>
                    <Category>{category}</Category>
                </Info>
            </Inner>
        </StyledItem>
    )
}

const Upcoming = ({
    lang, 
    inView, 
    data: {
        contentTitle,
        contentDescription,
        items
    }
}) => {
    return (
        <Wrapper>
            <Container>
                <Header 
                    lang={lang} 
                    title={contentTitle} 
                    size='normal' 
                />
                <Grid>
                    {items.map((item, index) => (
                        <Item key={index} data={item} lang={lang} />
                    ))}
                </Grid>
                <Description 
                    lang={lang} 
                    description={contentDescription}
                />
            </Container>
        </Wrapper>
    )
}

export default Upcoming
