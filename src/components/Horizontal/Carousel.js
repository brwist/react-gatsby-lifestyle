import React from 'react'
import styled from 'styled-components'
import theme from './../../styles/theme'

import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

import Card from './Card'
import HorizontalTitle from './HorizontalTitle'

const Wrapper = styled.div`
    padding: ${props => props.theme.desktopVW(240)} 0;

    .swiper-wrapper {
        padding: ${props => props.theme.desktopVW(120)} 0 ${props => props.theme.desktopVW(160)} 0;
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

const Carousel = ({
    lang,
    inView,
    items,
    title, 
    description,
    component,
    type,
    information,
    backgroundColor
}) => {

    const offset = 160

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
            {/* <Swiper {...params}>
                {items.map((item, i) => (
                    <Card
                        key={i}
                        lang={lang}
                        data={item}
                        component={component}
                        information={information}
                        type={type}
                    />
                ))}
            </Swiper> */}
        </Wrapper>
    )
}

export default Carousel
