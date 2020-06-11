import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

const StyledTestimonial = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

const ImageWrapper = styled.div`
    width: ${props => props.theme.mobileVW(50)};
    height: ${props => props.theme.mobileVW(50)};

    border-radius: 100%;

    overflow: hidden;

    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(64)};
        height: ${props.theme.desktopVW(64)};
    `}
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const DescriptionWrapper = styled.div`
    width: 75%;

    ${props => props.theme.above.desktop`
        width: 100%;
        max-width: ${props.theme.desktopVW(368)};
    `}
`

const Description = styled.p`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.xs};
    line-height: 1.43;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.s};
    `}
`

const Name = styled.h4`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.xs};
    line-height: 1.43;

    opacity: 0.6;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.s};
    `}
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
