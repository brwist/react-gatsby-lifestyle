import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import stickybits from 'stickybits'

import Seo from './../components/Layout/Seo'
import Constructor from './../components/Layout/Constructor'
import TextRenderer from '../components/TextRenderer'
import Container from './../components/Layout/Container'
import ButtonPrimary from '../components/Buttons/ButtonPrimary'
import Grain from './../components/Layout/Grain'
import RelatedArticles from './../components/RelatedArticles'

const Wrapper = styled.section`
    position: relative;

    padding: ${props => props.theme.sizes.mobile} 0 calc(${props => props.theme.sizes.mobile} * 3) 0;
    
    ${props => props.theme.above.desktop`
        padding: calc(${props.theme.sizes.desktop} * 5) 0 calc(${props.theme.sizes.desktop} * 5) 0;
    `}
`

const StyledContainer = styled(Container)`
    ${props => props.theme.above.desktop`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `}
`

const Information = styled.ul`
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

const InfoItem = styled.li`
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 1.5);

    ${props => props.flex && `
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .button {
            &:first-of-type {
                margin-bottom: calc(${props.theme.sizes.mobile} / 3);
            }
        }
    `}

    ${props => props.theme.above.desktop`
        margin-bottom: calc(${props.theme.sizes.desktop} * 1.5);

        ${props.flex && `
            .button {
                &:first-of-type {
                    margin-bottom: calc(${props.theme.sizes.desktop} / 2);
                }
            }
        `}
    `}
`

const InfoTitle = styled.span`
    display: block;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.p};
    line-height: 1;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.desktopVW(15)};

        font-size: ${props.theme.fontSizes.desktop.h6};
    `}
`

const InfoValue = styled.span`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1;

    ${props => props.large && `        
        font-family: ${props.theme.fontFamilies.plainRegular};
        font-size: ${props.theme.fontSizes.mobile.m};
    `}

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.p};

        ${props.large && `
            max-width: ${props.theme.desktopVW(600)};

            font-size: ${props.theme.fontSizes.desktop.h5};
        `}
    `}
`

const Content = styled.div`
    width: 100%;

    margin-bottom: calc(${props => props.theme.sizes.mobile} * 2);

    h4 {
        margin-bottom: ${props => props.theme.sizes.mobile};
    }

    ${props => props.theme.above.desktop`
        width: 50%;

        margin-bottom: 0;

        h4 {
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

const StyledTextRenderer = styled(TextRenderer)`
    a {
        color: ${props => props.theme.colors.orange};

        &:hover {
            text-decoration: underline;
        }
    }
`

const InfoBlock = ({
    className,
    mobile,
    data: {
        name,
        title,
        author,
        date,
        link,
        category
    }
}) => {
    
    const informationRef = useRef(null)

    useEffect(() => {
        if (mobile == 'false') {
            stickybits(informationRef.current, {
                verticalPosition: 'top',
                stickyBitStickyOffset: 150
            })
        }
    }, [])

    const getLinkLabel = () => {

        switch (category) {
            case 'Events': return 'Sign up for this event'
            case 'Careers': return 'Apply for this job'
            case 'News': return 'More information'
            default: return 'More information'
        }

    }

    return (
        <Information 
            className={className} 
            ref={informationRef}
            mobile={mobile}
        >
            <InfoItem>
                <InfoTitle>Title</InfoTitle>
                <InfoValue large>{title}</InfoValue>
            </InfoItem>
            <InfoItem>
                <InfoTitle>Author</InfoTitle>
                <InfoValue>{author}</InfoValue>
            </InfoItem>
            <InfoItem>
                <InfoTitle>Posted</InfoTitle>
                <InfoValue>{date}</InfoValue>
            </InfoItem>
            <InfoItem flex={true}>
                {link && (
                    <ButtonPrimary 
                        label={getLinkLabel()} 
                        href={link} 
                        inverted 
                    />
                )}
                <ButtonPrimary 
                    label='Share this page'
                    share={{
                        link: typeof window != 'undefined' && window.location.href,
                        text: name
                    }}
                />
            </InfoItem>
        </Information>
    )
}

const ArticleTemplate = ({
    pageContext: {
        layout: {
            langSlug
        }
    },
    data: {
        contentfulArticle
    }
}) => {
    
    const {
        category,
        content,
        components,
        title,
        seoImage,
        relatedArticles
    } = contentfulArticle

    return (
        <>
            <Seo 
                title={title} 
                image={seoImage && seoImage}
            />
            <Constructor
                lang={langSlug}
                category={category}
                data={components}
            />
            {content && (
                <Wrapper>
                    <StyledContainer>
                        <InfoBlock 
                            mobile='false' 
                            data={contentfulArticle} 
                        />
                        <Content>
                            <ContentInner>
                                <StyledTextRenderer 
                                    data={content} 
                                    useInlineLink
                                />
                            </ContentInner>
                        </Content>
                        <InfoBlock 
                            mobile='true' 
                            data={contentfulArticle} 
                        />
                    </StyledContainer>
                    {/* <Grain /> */}
                </Wrapper>
            )}
            {relatedArticles && (
                <RelatedArticles 
                    lang={langSlug}
                    data={relatedArticles}
                />
            )}
        </>
    )
}

export const query = graphql`
	query($id: String!) {
		contentfulArticle(id: {eq: $id}) {
            ...ArticleQuery
        }
	}
`

export default ArticleTemplate
