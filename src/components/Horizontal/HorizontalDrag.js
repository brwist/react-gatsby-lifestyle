import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useWindowSize } from 'react-use'
import MouseTooltip from 'react-sticky-mouse-tooltip'
import gsap from 'gsap'

import theme from './../../styles/theme'

import DragIcon from './DragIcon'
import Card from './Card'
import HorizontalTitle from './HorizontalTitle'
import Carousel from './../Carousel'

const Wrapper = styled.div`
    position: relative;

    padding: calc(${props => props.theme.sizes.mobile} * 3) 0;

    overflow: hidden;

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

const CarouselWrapper = styled.div`
    position: relative;
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

const StyledMousetip = styled(MouseTooltip)`
    display: block !important;
    
    transform: scale(${props => props.visible ? 1 : 0.5});

    z-index: 2;

    width: ${props => props.theme.desktopVW(150)};
    height: ${props => props.theme.desktopVW(150)};

    border-radius: 100%;

    background-color: #fff;
    
    opacity: ${props => props.visible ? 1 : 0};

    transition: transform 0.15s ease-out, opacity 0.15s ease-out;

    pointer-events: none;

    overflow: visible;
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

    const titleRef = useRef(null)
    const dragRef = useRef(null)

    const [isHovering, setIsHovering] = useState(false)
    const [isMouseMoving, setIsMouseMoving] = useState(false)

    const [dragSize, setDragSize] = useState({
        width: 50,
        height: 50
    })

    const { width: windowWidth } = useWindowSize()
    const offset = windowWidth < 1023 ? 32 : 80

    const params = {
        freeMode: true,
        initialSlide: items.length == 3 ? 1 : 0,
        spaceBetween: 32,
        slidesOffsetBefore: items.length == 3 ? 0 : offset,
        slidesOffsetAfter: items.length == 3 ? 0 : offset,
        slidesPerView: items.length == 3 ? 3 : 1.25,
        centeredSlides: items.length == 3 ? true : false,
        grabCursor: true,
        touchRatio: items.length == 3 ? 0 : 1,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: items.length == 3 ? true : false
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

    useEffect(() => {
        setDragSize({
            width: dragRef.current.clientWidth,
            height: dragRef.current.clientHeight
        })
    }, [])

    useEffect(() => {
        
        if (!inView) return 

        const timeline = new gsap.timeline()

        timeline.add(titleRef.current.transitionIn(), 0)

        return () => {
            timeline && timeline.kill()
        }

    }, [inView])

    return (
        <Wrapper 
            colors={getColors(backgroundColor)} 
            type={type}
        >
            <StyledTitle 
                ref={titleRef}
                lang={lang}
                type={type}
                title={title} 
                description={description} 
                overlayColor={backgroundColor}
                size='normal'
                useInlineLink={true}
            />
            <StyledMousetip
                visible={isHovering}
                offsetX={-dragSize.width / 2}
                offsetY={-dragSize.height / 2}
            >
                <DragIcon ref={dragRef} />
            </StyledMousetip>
            <CarouselWrapper
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={()  => setIsHovering(true)}
            >
                <Carousel 
                    params={params}
                >
                    {items.map((item, i) => {
                        return (
                            <Card
                                key={i}
                                lang={lang}
                                data={item}
                                inView={inView}
                                component={component}
                                information={information}
                                type={type}
                                overlayColor={backgroundColor}
                                active={item.slug != slug || component == 'InstagramFeed'}
                            />
                        )
                    })}
                </Carousel>
            </CarouselWrapper>
        </Wrapper>
    )
}

export default HorizontalDrag
