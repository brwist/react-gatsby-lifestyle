import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import stickybits from 'stickybits'

import Grain from './../Layout/Grain'
import Constructor from './../Layout/Constructor'
import Container from './../Layout/Container'
import HeroBanner from './../HeroBanner'
import Testimonial from '../Testimonial'
import GlobalForm from './../Forms/Global'
import SelfTestForm from './../Forms/SelfTest'
import TextRenderer from './../TextRenderer'

const Wrapper = styled.section`
    position: relative;

    padding: calc(${props => props.theme.sizes.mobile} * 3) 0;
    
    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 5) 0;
    `}
`

const StyledContainer = styled(Container)`
    ${props => props.theme.above.desktop`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `}
`

const StickyWrapper = styled.div`
    ${props => props.theme.below.desktop`
        ${props.mobile == 'true' && `
            display: block;
        `} 

        ${props.mobile == 'false' && `
            display: none;
        `} 
    `}

    ${props => props.theme.above.desktop`
        width: 100%;

        max-width: ${props.theme.desktopVW(600)};

        ${props.mobile == 'true' && `
            display: none;
        `} 

        ${props.mobile == 'false' && `
            display: block;
            
            height: 0;
        `} 
    `}
`

const Copy = styled.div`
    width: 100%;

    margin-bottom: ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};
    `}
`

const Title = styled.h4`
    display: block;

    margin-bottom: ${props => props.theme.sizes.mobile};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.mobile.h5};

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};

        font-family: ${props.theme.fontFamilies.nbBold};
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const StyledTestimonial = styled(Testimonial)`
    max-width: ${props => props.theme.mobileVW(450)};

    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(450)};
    `}
`

const Content = styled.div`
    width: 100%;

    margin-bottom: calc(${props => props.theme.sizes.mobile} * 3);

    b {
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }

    h5 {
        margin-bottom: ${props => props.theme.sizes.mobile};
        
        font-family: ${props => props.theme.fontFamilies.plainRegular};
    }

    a {
        color: ${props => props.theme.colors.orange};
    }

    ${props => props.theme.above.desktop`
        width: 50%;

        margin-bottom: 0;

        h5 {
            margin-bottom: ${props.theme.sizes.desktop};
        }
    `}
`

const ContentInner = styled.div`
    width: 100%;
    
    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(650)};
    `}
`

const StickyComponent = ({
    className,
    mobile, 
    data
}) => {
    
    const testimonialsRef = useRef(null)

    useEffect(() => {
        if (mobile == 'false') {
            stickybits(testimonialsRef.current, {
                verticalPosition: 'top',
                stickyBitStickyOffset: 150
            })
        }
    }, [])

    return (
        <StickyWrapper 
            className={className} 
            mobile={mobile}
            ref={testimonialsRef}
        >
            {data.testimonial && (
                <StyledTestimonial data={data.testimonial} />
            )}
        </StickyWrapper>
    )
}

const PopupPage = ({
    lang,
    data,
    slug,
    formInput
}) => {
    
    let showGlobalForm = slug == 'join-us' || slug == 'reserve-your-spot'

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
                    <StickyComponent 
                        mobile='false' 
                        data={data} 
                    />
                    <Content>
                        <ContentInner>
                            {showGlobalForm && <GlobalForm lang={lang} data={data} formInput={formInput} />}
                            {slug == 'self-test' && <SelfTestForm lang={lang} data={data} />}
                            {slug == 'cookies-and-privacy' && <TextRenderer lang={lang} data={data.contentDescription} useInlineLink />}
                        </ContentInner>
                    </Content>
                    <StickyComponent 
                        mobile='true' 
                        data={data}
                    />
                </StyledContainer>
                {/* <Grain /> */}
            </Wrapper>
        </>
    )
}

export default PopupPage