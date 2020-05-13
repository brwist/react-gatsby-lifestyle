import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import TextRenderer from './TextRenderer'
import Container from './Layout/Container'
import Title from './Title'

const Header = styled(Container)`
    position: absolute;

    top: calc(${props => props.theme.sizes.desktop} * 2);
    left: 50%;

    transform: translateX(-50%);
`

const StyledTitle = styled(Title)`
    .heading {
        margin-left: 0;
    }
`

const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    margin-bottom: calc(${props => props.theme.sizes.desktop} * 10);
`

const Item = styled.li`
    position: relative;

    padding-bottom: 50%;

    &:nth-of-type(1) {
        grid-column: 2;

        .inner {
            left: initial;
            right: 0;
        }
    }

    &:nth-of-type(4),
    &:nth-of-type(5) {
        .inner {
            left: initial;
            right: 0;
        }
    }

    &:hover {
        .inner {
            width: 100%;
        }

        .back {
            display: block;
        }
    }
`

const Inner = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 50%;
    height: 100%;
    
    text-align: left;
`

const Category = styled.span`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.desktop} / 2);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.s};
    line-height: 1.5;

    color: currentColor;

    opacity: 0.6;
`

const Front = styled.div`
    position: absolute;
    
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    padding: ${props => props.theme.desktopVW(80)};

    background-color: ${props => props.theme.colors.darkGrey};

    color: ${props => props.theme.colors.light};
`

const Question = styled.p`
    position: relative;

    font-size: ${props => props.theme.fontSizes.desktop.h6};
    line-height: 1.3;

    color: currentColor;
`

const Back = styled.div`
    display: none;

    position: absolute;
    
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    padding: ${props => props.theme.desktopVW(80)};

    background-color: ${props => props.theme.colors.white};

    color: ${props => props.theme.colors.dark};
`

const Answer = styled(TextRenderer)`
    position: relative;
`

const Background = styled(Image)`
    position: absolute !important;

    top: 0;
    left: 0;

    ${props => props.theme.styles.image.objectCover};

    opacity: 0.35;
`

const Faq = ({
    lang, 
    inView,
    data: {
        contentTitle, 
        items
    }
}) => {
    return (
        <>
            <Header>
                <StyledTitle title={contentTitle} size='normal' />
            </Header>
            <Grid>
                {items.map(({ question, answer, category, image }, i) => (
                    <Item key={i}>
                        <Inner className='inner'>
                            <Front className='front'>
                                {category && (
                                    <Category>{category}</Category>
                                )}
                                <Question>{question}</Question>
                            </Front>
                            <Back className='back'>
                                <Background fluid={image.fluid} alt={image.alt} />
                                {category && (
                                    <Category className='category'>{category}</Category>
                                )}
                                <Answer data={answer} />
                            </Back>
                        </Inner>
                    </Item>
                ))}
            </Grid>
        </>
    )
}

export default Faq
