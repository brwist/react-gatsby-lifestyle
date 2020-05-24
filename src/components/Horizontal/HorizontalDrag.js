import React from 'react'
import styled from 'styled-components'
import theme from './../../styles/theme'

import Card from './Card'
import HorizontalTitle from './HorizontalTitle'
import Carousel from './../Carousel'

const Wrapper = styled.div`
    padding: ${props => props.theme.desktopVW(120)} 0;

    .swiper-wrapper {
        padding: ${props => props.theme.desktopVW(120)} 0;
    }

    .swiper-scrollbar {
        left: 50%;
        bottom: 0;

        transform: translateX(-50%);

        width: ${props => props.theme.desktopVW(160)};
        
        background-color: ${props => props.colors.bar};

        .swiper-scrollbar-drag {
            background-color: ${props => props.colors.drag};
        }
	}
`

const HorizontalDrag = ({
    lang,
    inView,
    items,
    title, 
    description,
    component,
    type,
    slug,
    information,
    backgroundColor
}) => {

    const offset = 80

    const params = {
        spaceBetween: offset,
        slidesOffsetBefore: offset,
        slidesOffsetAfter: offset,
        slidesPerView: 'auto',
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        }
    }

    const getColors = background => {
        switch (background) {
            case 'Black': {
                let colors = {
                    bar: 'rgba(255, 255, 255, 0.1)',
                    drag: theme.colors['light']
                }
                return colors
            }
            case 'White':
            case 'Grey': {
                let colors = {
                    bar: 'rgba(0, 0, 0, 0.1)',
                    drag: theme.colors['dark']
                }
                return colors
            }
        }
    }

    return (
        <Wrapper colors={getColors(backgroundColor)}>
            <HorizontalTitle 
                lang={lang}
                title={title} 
                description={description} 
                size='normal'
                useInlineLink={true}
            />
            <Carousel params={params}>
                {items.map((item, i) => {
                    return (
                        <Card
                            key={i}
                            lang={lang}
                            data={item}
                            component={component}
                            information={information}
                            type={type}
                            active={item.slug != slug || component == 'InstagramFeed'}
                        />
                    )
                })}
            </Carousel>
        </Wrapper>
    )
}

export default HorizontalDrag
