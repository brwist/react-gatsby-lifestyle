import React, { useContext } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Title from './Title'
import Container from './Layout/Container'
import ButtonArrow from './Buttons/ButtonArrow'

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
    .heading {
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

    ${props => props.theme.above.desktop`
        .description-wrapper {
            max-width: ${props.theme.desktopVW(380)};
        }
    `}
`

const StyledItem = styled.li`
    width: 100%;

    ${props => props.theme.above.desktop`
        width: 50%;

        &:nth-of-type(2),
        &:nth-of-type(3) {
            margin-top: ${props.theme.desktopVW(500)};

            .inner {
                width: ${props.theme.desktopVW(400)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(560)};
            }
        }

        &:nth-of-type(3) {
            margin-top: -${props.theme.desktopVW(100)};
        }

        &:nth-of-type(4) {
            margin-top: ${props.theme.desktopVW(200)};
            margin-bottom: calc(${props.theme.sizes.desktop} * 5);

            .inner {
                width: ${props.theme.desktopVW(720)};
            }

            .image-wrapper {
                height: ${props.theme.desktopVW(640)};
            }
        }
    `}
`

const Inner = styled.div`
    width: 100%;
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(560)};
    `}
`

const ImageWrapper = styled.div`
    display: block;

    position: relative;

    width: 100%;

    ${props => props.theme.below.desktop`
        margin-bottom: calc(${props.theme.sizes.mobile} / 2);
        padding-bottom: 145.34%;
    `}

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(640)};

        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const StyledImage = styled(Img)`
    ${props => props.theme.styles.image.objectCover};

    ${props => props.theme.below.desktop`
        position: absolute !important;

        top: 0;
        left: 0;
    `}
`

const Name = styled.h4`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 2);

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.h6};
    line-height: 1.2;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props => props.theme.sizes.desktop};
        
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Info = styled.div`
    ${props => props.theme.styles.flexBox.horCen};
`

const Category = styled.span`
    font-family: ${props => props.theme.fontFamilies.nbRegular};
    font-size: ${props => props.theme.fontSizes.mobile.xs};
    line-height: 1.5;

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.m};
    `}
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
            <StyledContainer>
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
            </StyledContainer>
        </Wrapper>
    )
}

export default Upcoming
