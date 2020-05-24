import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import stickybits from 'stickybits'

import Container from './../Layout/Container'
import HeroBanner from './../HeroBanner'
import Testimonial from '../Testimonial'
import JoinUsForm from './../Forms/JoinUs'
import SelfTestForm from './../Forms/SelfTest'
import TextRenderer from './../TextRenderer'

const Wrapper = styled.div`
    margin: ${props => props.theme.desktopVW(280)} 0;
`

const StyledHeroBanner = styled(HeroBanner)`
    // .description-wrapper {
    //     margin-bottom: ${props => props.theme.desktopVW(120)};
    // }
    
    // .description {
    //     font-size: ${props => props.theme.fontSizes.desktop.h6};
    // }
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TestimonialWrapper = styled.div`
    display: block;
    height: 0;
`

const Content = styled.div`
    width: 100%;
    max-width: ${props => props.theme.desktopVW(720)};

    margin-right: calc(${props => props.theme.sizes.desktop} * 4);
`

const PopupPage = ({
    lang,
    data,
    slug
}) => {

    const testimonialsRef = useRef(null)

    useEffect(() => {
        stickybits(testimonialsRef.current, {
            verticalPosition: 'top',
            stickyBitStickyOffset: 150
        })
    }, [])
    
    return (
        <>
            <StyledHeroBanner
                lang={lang}
                data={data.components}
            />
            <Wrapper>
                <StyledContainer>
                    <TestimonialWrapper ref={testimonialsRef}>
                        {data.testimonial && <Testimonial data={data.testimonial} />}
                    </TestimonialWrapper>
                    <Content>
                        {slug == 'join-us' && <JoinUsForm lang={lang} data={data} />}
                        {slug == 'self-test' && <SelfTestForm lang={lang} data={data} />}
                    </Content>
                </StyledContainer>
            </Wrapper>
        </>
    )
}

export default PopupPage
