import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useWindowSize } from 'react-use'
import gsap from 'gsap'

import theme from './../../styles/theme'

// import DragIcon from './DragIcon'
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

        transform: translateX(-50%) scaleX(0);

        width: 60%;
        min-width: ${props => props.theme.mobileVW(200)};
        
        background-color: ${props => props.colors.bar};

        opacity: 0;

        .swiper-scrollbar-drag {
            background-color: ${props => props.colors.drag};
        }
    }
    
    ${props => props.theme.above.desktop`
        padding: ${props.theme.desktopVW(120)} 0;

        ${props.type == 'Straight' && `
            .swiper-wrapper {
                padding: ${props.theme.desktopVW(120)} 0 ${props.theme.desktopVW(120)} 0;
            }
        `}

        ${props.type == 'Wave' && `
            .swiper-wrapper {
                padding-bottom: ${props.theme.desktopVW(60)};
            }
        `}

        .swiper-container {
            overflow: visible;
        }

        .swiper-scrollbar {
            min-width: ${props.theme.desktopVW(160)};
            width: ${props.theme.desktopVW(160)};
        }

        > img {
            opacity: 1 !important;
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

    ${props => props.theme.below.desktop`
        ${props.type == 'Wave' && `
            .title-wrapper {
                margin-bottom: 0;
            }
        `}
        
        ${props.type == 'Straight' && `
            .title-wrapper {
                margin-bottom: 0;
            }

            .title-container {
                &:nth-of-type(2) {
                    margin-top: calc(${props.theme.sizes.mobile} / 2);
                }
            }
        `}
    `}

    ${props => props.theme.above.desktop`
        ${props.type == 'Wave' && `
            margin-bottom: -${props.theme.desktopVW(50)};
        `}
    `}
`

const HorizontalDrag = ({
    lang,
    inView,
    items,
    hashtags,
    title, 
    description,
    component,
    type,
    slug,
    category,
    information,
    backgroundColor,
    className
}) => {

    // Refs
    const titleRef = useRef(null)
    const dragRef = useRef(null)

    // States
    const [isHovering, setIsHovering] = useState(false)
    const [isMouseMoving, setIsMouseMoving] = useState(false)
    const [carouselItems, setCarouselItems] = useState(items)

    // Variables
    const { width: windowWidth } = useWindowSize()
    const isMobile = windowWidth < theme.breakpoints.desktop
    const offset = isMobile ? 32 : windowWidth * 0.1
    const isDisabled = !isMobile && carouselItems.length == 3

    // Params
    const params = {
        initialSlide: isDisabled ? 1 : 0,
        spaceBetween: offset,
        slidesOffsetBefore: isDisabled ? 0 : offset,
        slidesOffsetAfter: isDisabled ? 0 : offset,
        slidesPerView: isDisabled ? 3 : 1.25,
        centeredSlides: isDisabled ? true : false,
        grabCursor: isMobile || carouselItems.length == 3 ? false : true,
        touchRatio: !isMobile && isDisabled ? 0 : 1,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: isDisabled ? true : false
        },
        breakpoints: {
            1023: {
                spaceBetween: offset / 2,
                slidesPerView: 'auto',
            }
        }
    }

    const getColors = background => {
        switch (background) {
            case 'White':
            case 'Grey': {
                let colors = {
                    bar: 'rgba(0, 0, 0, 0.1)',
                    drag: theme.colors['dark']
                }
                return colors
            }
            case 'Black':
            default: {
                let colors = {
                    bar: 'rgba(255, 255, 255, 0.1)',
                    drag: theme.colors['light']
                }
                return colors
            }
        }
    }

    useEffect(() => {

        let scrollBar = document.querySelectorAll('.swiper-scrollbar')
        
        if (!inView) return

        gsap.to(scrollBar, { scaleX: 1.0, alpha: 1.0, delay: 0.75, transformOrigin: 'center', ease: 'power3.out' })

    }, [inView])

    useEffect(() => {

        function hasTerm(string, terms) {
            function search(term) { 
                return string.includes(term)
            }
            return terms.map(search).includes(true)
        }

        if (hashtags) {

            if (hashtags[0] == 'robertstols' || hashtags[0] == 'all') return
            
            let hashtagItems = []

            items.forEach((item) => {
                if (item.caption == null) return 
                
                if (hasTerm(item.caption, hashtags)) {
                    hashtagItems.push(item)
                }
            })

            setCarouselItems(hashtagItems)
        }

    }, [])

    return (
        <Wrapper 
            colors={getColors(backgroundColor)} 
            type={type}
            className={className}
        >
            <StyledTitle 
                ref={titleRef}
                lang={lang}
                inView={inView}
                type={type}
                title={title} 
                description={description} 
                overlayColor={backgroundColor}
                size='normal'
                useInlineLink={true}
            />
            <CarouselWrapper
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={()  => setIsHovering(true)}
            >
                <Carousel 
                    params={params}
                >
                    {carouselItems.slice(0, 9).map((item, i) => {
                        return (
                            <Card
                                key={i}
                                index={i}
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
