import React, { useState } from 'react'
import styled from 'styled-components'
import { useWindowSize } from 'react-use'

import theme from './../../styles/theme'

import DragIcon from './DragIcon'
import Card from './Card'
import HorizontalTitle from './HorizontalTitle'
import Carousel from './../Carousel'

const Wrapper = styled.div`
    padding: calc(${props => props.theme.sizes.mobile} * 3) 0;

    ${props => props.type == 'Straight' && `
        .swiper-wrapper {
            padding: calc(${props.theme.sizes.mobile} * 3) 0;
        }
    `}

    ${props => props.type == 'Wave' && `
        .swiper-wrapper {
            padding-bottom: calc(${props.theme.sizes.mobile} * 3);
        }
    `}

    .swiper-scrollbar {
        left: 50%;
        bottom: 0;

        transform: translateX(-50%);

        width: 60%;
        min-width: ${props => props.theme.mobileVW(200)};
        
        background-color: ${props => props.colors.bar};

        .swiper-scrollbar-drag {
            background-color: ${props => props.colors.drag};
        }
    }
    
    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(120)} 0;

        ${props.type == 'Straight' && `
            .swiper-wrapper {
                padding: ${props.theme.desktopVW(120)} 0;
            }
        `}

        ${props.type == 'Wave' && `
            .swiper-wrapper {
                padding-bottom: ${props.theme.desktopVW(120)};
            }
        `}

        .swiper-container {
            overflow: visible;
        }

        .swiper-scrollbar {
            min-width: ${props.theme.desktopVW(160)};
            width: ${props.theme.desktopVW(160)};
        }
    `}
`

const StyledTitle = styled(HorizontalTitle)`
    ${props => props.type == 'Wave' && `
        margin-bottom: calc(${props.theme.sizes.mobile} * 2);
    `}

    ${props => props.theme.above.desktop`
        ${props.type == 'Wave' && `
            margin-bottom: -${props.theme.desktopVW(50)};
        `}
    `}
`

const StyledDragIcon = styled(DragIcon)`
    position: absolute;

    top: 0;
    left: 0;

    width: ${props => props.theme.desktopVW(50)};
    height: ${props => props.theme.desktopVW(50)};

    border-radius: 100%;

    background-color: #fff;
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

    const [isHovering, setIsHovering] = useState(false)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})
    const { width: windowWidth } = useWindowSize()
    const offset = windowWidth < 1023 ? 32 : 80

    const params = {
        spaceBetween: 32,
        slidesOffsetBefore: offset,
        slidesOffsetAfter: offset,
        slidesPerView: 1.25,
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        },
        breakpoints: {
            1023: {
                spaceBetween: 80,
                slidesPerView: 'auto',
            }
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

    const toggleMouseEvent = () => {
        setIsHovering(!isHovering)
    }
    
    const handleMouseMove = e => {
        setCoordinates({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        })
    }

    return (
        <Wrapper 
            colors={getColors(backgroundColor)} 
            type={type}
            onMouseEnter={toggleMouseEvent}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={toggleMouseEvent}
        >
            <StyledTitle 
                lang={lang}
                type={type}
                title={title} 
                description={description} 
                size='normal'
                useInlineLink={true}
            />
            <StyledDragIcon style={{ top: coordinates.y, left: coordinates.x }} />
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
