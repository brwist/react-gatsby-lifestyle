import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import TextRenderer from './TextRenderer'
import Container from './Layout/Container'
import Title from './Title'
import Carousel from './Carousel'

import FaqMobileItem from './FaqMobileItem'
import FaqDesktopItem from './FaqDesktopItem'

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
    .title-wrapper {
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
        grabCursor: true,
        autoHeight: true
    }

    return (
        <Wrapper>
            <Header>
                <StyledTitle title={contentTitle} size='normal' />
            </Header>
            <Grid>
                {items.map((item, i) => (
                    <FaqDesktopItem key={i} data={item} />
                ))}
            </Grid>
            <CarouselWrapper>
                <StyledCarousel params={params}>
                    {items.slice(0, 3).map((item, i) => (
                        <FaqMobileItem key={i} data={item} />
                    ))}
                </StyledCarousel>
                <StyledCarousel params={{ ...params, initialSlide: 1 }}>
                    {items.slice(-2).map((item, i) => (
                        <FaqMobileItem key={i} data={item} />
                    ))}
                </StyledCarousel>
            </CarouselWrapper>
        </Wrapper>
    )
}

export default Faq
