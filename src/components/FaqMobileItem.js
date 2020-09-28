import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import TextRenderer from './TextRenderer'

const Item = styled.div`
    position: relative;

    width: 100%;

    align-self: stretch;

    ${props => props.colored && `
        .front {
            color: ${props.theme.colors.dark};
            
            background-color: ${props.theme.colors.yellow};
        }
    `}
`

const Inner = styled.div`
    position: relative;

    width: 100%;
    height: 100%;
    
    text-align: left;
`

const Category = styled.span`
    display: block;
    
    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    color: currentColor;

    opacity: 0.6;
`

const Front = styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    background-color: ${props => props.theme.colors.darkGrey};

    padding: ${props => props.theme.sizes.mobile};

    color: ${props => props.theme.colors.light};

    overflow: scroll;
`

const Question = styled.p`
    position: relative;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 3);

    font-family: ${props => props.theme.fontFamilies.plainRegular};
    font-size: ${props => props.theme.fontSizes.mobile.p};
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

    padding: ${props => props.theme.sizes.mobile};

    background-color: ${props => props.theme.colors.white};

    color: ${props => props.theme.colors.light};
`

const Answer = styled(TextRenderer)`
    position: relative;

    width: 100%;

    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.3;

    color: currentColor;
`

const BackgroundWrapper = styled.div`
    width: 100%;
    height: 100%;
`

const Background = styled(Image)`
    position: absolute !important;

    top: 0;
    left: 0;

    ${props => props.theme.styles.image.objectCover};

    &:after {
        content: '';
        
        ${props => props.theme.styles.element.fill};

        background-color: rgba(16, 16, 16, 0.65);
    }
`

const FaqMobileItem = ({ 
    className,
    colored,
    data: {
        question, 
        answer, 
        category, 
        image
    }
}) => {
    return (
        <Item className={className} colored={colored}>
            <Inner className='inner'>
                <Front className='front'>
                    {category && (
                        <Category>{category}</Category>
                    )}
                    <Question>{question}</Question>
                    <Answer data={answer} mobile='true' />
                </Front>
                <Back className='back'>
                    <BackgroundWrapper>
                        {image && <Background fluid={image.fluid} alt={image.alt} />}
                    </BackgroundWrapper>
                    <Answer data={answer} />
                </Back>
            </Inner>
        </Item>
    )
}

export default FaqMobileItem
