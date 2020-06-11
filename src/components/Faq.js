import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import TextRenderer from './TextRenderer'
import Container from './Layout/Container'
import Title from './Title'
import Carousel from './Carousel'

const Wrapper = styled.div`
    padding-bottom: calc(${props => props.theme.sizes.mobile} * 3);
    
    ${props => props.theme.above.desktop`
        padding-bottom: calc(${props.theme.sizes.desktop} * 10);
    `}
`

const Header = styled(Container)`
    margin-bottom: calc(${props => props.theme.sizes.mobile} * 3);

    ${props => props.theme.above.desktop`
        position: absolute;

        top: calc(${props.theme.sizes.desktop} * 2);
        left: 50%;

        transform: translateX(-50%);

        margin-bottom: 0;
    `}
`

const StyledTitle = styled(Title)`
    .heading {
        margin-left: 0;
    }
`

const CarouselWrapper = styled.div`
    ${props => props.theme.above.desktop`
        display: none;
    `}
`

const StyledCarousel = styled(Carousel)`
    &:not(:last-of-type) {
        margin-bottom: 32px;
    }
`

const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    ${props => props.theme.below.desktop`
        display: none;
    `}
`

const Item = styled.div`
    position: relative;

    width: 100%;

    ${props => props.theme.above.desktop`
        padding-bottom: 50%;

        &:nth-of-type(1) {
            grid-column: 2;

            .inner {
                left: initial;
                right: 0;
            }
        }

        &:nth-of-type(4),
        &:nth-of-type(5) {
            .inner {
                left: initial;
                right: 0;
            }
        }

        &:hover {
            .inner {
                width: 100%;
            }

            .back {
                display: block;
            }
        }
    `}
`

const Inner = styled.div`
    position: relative;

    width: 100%;
    height: 100%;
    
    text-align: left;

    ${props => props.theme.above.desktop`
        position: absolute;

        top: 0;
        left: 0;

        width: 50%;
    `}
`

const Category = styled.span`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    color: currentColor;

    opacity: 0.6;

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} / 2);
        font-size: ${props.theme.fontSizes.desktop.s};
    `}
`

const Front = styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    padding: ${props => props.theme.sizes.mobile};

    background-color: ${props => props.theme.colors.darkGrey};

    color: ${props => props.theme.colors.light};

    ${props => props.theme.above.desktop`
        position: absolute;
        
        top: 0;
        left: 0;
        
        padding: ${props.theme.desktopVW(80)};
    `}
`

const Question = styled.p`
    position: relative;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.p};
    line-height: 1.3;

    color: currentColor;

    ${props => props.theme.above.desktop`
        margin-bottom: 0;
        
        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const Back = styled.div`
    display: none;

    position: absolute;
    
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    padding: ${props => props.theme.sizes.mobile};

    background-color: ${props => props.theme.colors.white};

    color: ${props => props.theme.colors.light};

    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(80)};
    `}
`

const Answer = styled(TextRenderer)`
    position: relative;

    width: 100%;

    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.3;

    color: currentColor;

    ${props => props.theme.above.desktop`
        ${props.mobile == 'true' && `
            display: none;
        `}
    `}

    ${props => props.theme.above.desktop`
        width: 75%;

        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const Background = styled(Image)`
    position: absolute !important;

    top: 0;
    left: 0;

    ${props => props.theme.styles.image.objectCover};

    &:after {
        content: '';
        
        ${props => props.theme.styles.element.fill};

        background-color: rgba(16, 16, 16, 0.65);
    }
`

const GridItem = ({ 
    className,
    data: {
        question, 
        answer, 
        category, 
        image
    }
}) => (
    <Item className={className}>
        <Inner className='inner'>
            <Front className='front'>
                {category && (
                    <Category>{category}</Category>
                )}
                <Question>{question}</Question>
                <Answer data={answer} mobile='true' />
            </Front>
            <Back className='back'>
                <Background fluid={image.fluid} alt={image.alt} />
                {category && (
                    <Category className='category'>{category}</Category>
                )}
                <Answer data={answer} />
            </Back>
        </Inner>
    </Item>
)

const Faq = ({
    lang, 
    inView,
    data: {
        contentTitle, 
        items
    }
}) => {

    const params = {
        spaceBetween: 32,
        slidesPerView: 1.25,
        grabCursor: true
    }

    return (
        <Wrapper>
            <Header>
                <StyledTitle title={contentTitle} size='normal' />
            </Header>
            <Grid>
                {items.map((item, i) => (
                    <GridItem key={i} data={item} />
                ))}
            </Grid>
            <CarouselWrapper>
                <StyledCarousel params={params}>
                    {items.slice(0, 3).map((item, i) => (
                        <GridItem key={i} data={item} />
                    ))}
                </StyledCarousel>
                <StyledCarousel params={{ ...params, initialSlide: 1 }}>
                    {items.slice(-2).map((item, i) => (
                        <GridItem key={i} data={item} />
                    ))}
                </StyledCarousel>
            </CarouselWrapper>
        </Wrapper>
    )
}

export default Faq
