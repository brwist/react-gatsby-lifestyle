import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Container from './Layout/Container'
import Title from './Title'
import TextRenderer from './TextRenderer'
import Testimonial from './Testimonial'

const StyledHeroBanner = styled.div`
    position: relative;

    width: 100%;
    
    height: 100vh;
    max-height: ${props => props.theme.desktopVW(1080)};

    ${props => props.theme.below.maxWidth`
        padding: 0 ${props => props.theme.sizes.desktop};
    `}
`

const StyledTitle = styled(Title)`
    position: absolute;
    
    top: 50%;
    left: 0;

    transform: translateY(-50%);
`

const ImageWrapper = styled.div`
    position: absolute;

    top: 0;
    right: 0;

    width: 50vw;
    height: 100%;

    background-color: ${props => props.theme.colors.darkGrey};
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const HeroBanner = ({
    lang,
    className,
    category,
    data: {
        bannerType,
        tags, 
        images,
        headerTitle, 
        headerDescription,
        testimonial,
        internalLinks,
        externalLink,
        externalLinkLabel
    }
}) => {
    
    const titleSize = (bannerType == 'Home') ? 'extra-large' : (bannerType == 'Page') ? 'large' : 'small'

    return (
        <StyledHeroBanner className={className} type={bannerType}>
            {images && (
                <ImageWrapper>
                    {images.map(({ fluid, title }, i) => (
                        <StyledImage key={i} fluid={fluid} alt={title} />
                    ))}
                </ImageWrapper>
            )}
            <Container>
                <StyledTitle 
                    lang={lang}
                    size={titleSize}
                    tags={tags}
                    title={headerTitle} 
                    description={headerDescription}
                    testimonial={testimonial}
                    category={category}
                    links={internalLinks || externalLink && {
                        internal: internalLinks,
                        external: {
                            link: externalLink,
                            label: externalLinkLabel
                        }
                    }}
                />
            </Container>
        </StyledHeroBanner>
    )
}

export default HeroBanner
