import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import stickybits from 'stickybits'

import Grain from './../Layout/Grain'
import Constructor from './../Layout/Constructor'
import Container from './../Layout/Container'
import HeroBanner from './../HeroBanner'
import Testimonial from '../Testimonial'
import JoinUsForm from './../Forms/JoinUs'
import SelfTestForm from './../Forms/SelfTest'
import TextRenderer from './../TextRenderer'

const Wrapper = styled.section`
    position: relative;

    padding: calc(${props => props.theme.sizes.mobile} * 3) 0;
    
    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 10) 0;
    `}
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
    ${props => props.theme.above.desktop`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `}
`

const TestimonialWrapper = styled.div`
    ${props => props.theme.below.desktop`
        ${props.mobile == 'true' && `
            display: block;
        `} 

        ${props.mobile == 'false' && `
            display: none;
        `} 
    `}

    ${props => props.theme.above.desktop`
        ${props.mobile == 'true' && `
            display: none;
        `} 

        ${props.mobile == 'false' && `
            display: block;
            
            height: 0;
        `} 
    `}
`

const Content = styled.div`
    width: 100%;

    margin-bottom: calc(${props => props.theme.sizes.mobile} * 3);

    h5 {
        margin-bottom: ${props => props.theme.sizes.mobile};
    }

    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(720)};

        margin-bottom: 0;
        margin-right: calc(${props.theme.sizes.desktop} * 4);   

        h5 {
            margin-bottom: ${props.theme.sizes.desktop};
        }
    `}
`

const TestimonialComponent = ({
    className,
    mobile, 
    data
}) => {
    
    const testimonialsRef = useRef(null)

    useEffect(() => {
        if (mobile == 'true') {
            stickybits(testimonialsRef.current, {
                verticalPosition: 'top',
                stickyBitStickyOffset: 150
            })
        }
    }, [])

    return (
        <TestimonialWrapper 
            className={className} 
            mobile={mobile}
            ref={testimonialsRef}
        >
            {data.testimonial && <Testimonial data={data.testimonial} />}
        </TestimonialWrapper>
    )
}

const PopupPage = ({
    lang,
    data,
    slug
}) => {
    return (
        <>
            <Constructor
                lang={lang}
                slug={slug}
                category='Events'
                data={data.components}
            />
            <Wrapper>
                <StyledContainer>
                    <TestimonialComponent mobile='false' data={data} />
                    <Content>
                        {slug == 'join-us' && <JoinUsForm lang={lang} data={data} />}
                        {slug == 'self-test' && <SelfTestForm lang={lang} data={data} />}
                    </Content>
                    <TestimonialComponent mobile='true' data={data} />
                </StyledContainer>
                {/* <Grain /> */}
            </Wrapper>
        </>
    )
}

export default PopupPage
