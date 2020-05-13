import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

const StyledTestimonial = styled.div`
    
`

const ImageWrapper = styled.div`
    display: inline-block;
    vertical-align: top;
    
    width: ${props => props.theme.desktopVW(64)};
    height: ${props => props.theme.desktopVW(64)};

    margin-right: ${props => props.theme.sizes.desktop};

    border-radius: 100%;

    overflow: hidden;
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const DescriptionWrapper = styled.div`
    display: inline-block;
    vertical-align: top;

    width: 100%;
    max-width: ${props => props.theme.desktopVW(368)};
`

const Description = styled.p`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.s};
    line-height: 1.43;
`

const Name = styled.h4`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.s};
    line-height: 1.43;

    opacity: 0.6;
`

const Testimonial = ({
    className,
    data: {
        name,
        image,
        description: {
            description
        }
    }
}) => {
    return (
        <StyledTestimonial className={className}>
            <ImageWrapper>
                <StyledImage fluid={image.fluid} alt={image.title}/>
            </ImageWrapper>
            <DescriptionWrapper>
                <Description>{description}</Description>
                <Name>{name}</Name>
            </DescriptionWrapper>
        </StyledTestimonial>
    )
}

export default Testimonial
