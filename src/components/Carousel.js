import React from 'react'
import styled from 'styled-components'

import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

const Wrapper = styled.div`
    > img, + img, img {
        opacity: 1 !important;
    }
`

const Carousel = ({
    className,
    children,
    params
}) => {
    return (
        <Wrapper className={className}>
            <Swiper {...params}>
                {children}
            </Swiper>
        </Wrapper>
    )
}

export default Carousel
