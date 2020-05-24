import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import stickybits from 'stickybits'

import Constructor from './../components/Layout/Constructor'
import TextRenderer from '../components/TextRenderer'
import Container from './../components/Layout/Container'
import ButtonPrimary from '../components/Buttons/ButtonPrimary'

const Wrapper = styled.div`
    margin: ${props => props.theme.desktopVW(280)} 0;
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Information = styled.ul`
    display: block;
    height: 0;
`

const InfoItem = styled.li`
    margin-bottom: ${props => props.theme.desktopVW(48)};

    ${props => props.flex && `
        display: flex;
        flex-direction: column;

        .button {
            &:first-of-type {
                margin-bottom: calc(${props.theme.sizes.desktop} / 2);
            }
        }
    `}
`

const InfoTitle = styled.span`
    display: block;

    margin-bottom: ${props => props.theme.desktopVW(15)};

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.h6};
    line-height: 1;
`

const InfoValue = styled.span`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.p};
    line-height: 1;
`

const Content = styled.div`
    width: 100%;
    max-width: ${props => props.theme.desktopVW(720)};

    margin-right: calc(${props => props.theme.sizes.desktop} * 4);

    h4 {
        margin-bottom: calc(${props => props.theme.sizes.desktop} * 1.5);
    }

    li {
        position: relative;

        padding-left: ${props => props.theme.desktopVW(25)};

        &:before {
            content: '—';
            position: absolute;

            margin-top: 3px;
            margin-left: -${props => props.theme.desktopVW(25)};
        }

        p {
            margin-bottom: 0;
        }
    }
`

const ArticleTemplate = ({
    pageContext: {
        layout: {
            langSlug
        }
    },
    data: {
        contentfulArticle: {
            category,
            content,
            author,
            date,
            components
        }
    }
}) => {

    const informationRef = useRef(null)

    useEffect(() => {
        stickybits(informationRef.current, { 
            verticalPosition: 'top',
            stickyBitStickyOffset: 150
        })
    }, [])

    return (
        <>
            <Constructor
                lang={langSlug}
                category={category}
                data={components}
            />
            <Wrapper>
                <StyledContainer>
                    <Information ref={informationRef}>
                        <InfoItem>
                            <InfoTitle>Author</InfoTitle>
                            <InfoValue>{author}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoTitle>Posted</InfoTitle>
                            <InfoValue>{date}</InfoValue>
                        </InfoItem>
                        <InfoItem flex={true}>
                            <ButtonPrimary label='Apply for this job' href='https://google.com' inverted />
                            <ButtonPrimary label='Share this page' href='https://facebook.com/' />
                        </InfoItem>
                    </Information>
                    <Content>
                        <TextRenderer data={content} />
                    </Content>
                </StyledContainer>
            </Wrapper>
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
