import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Container from './Layout/Container'
import Title from './Title'
import TextRenderer from './TextRenderer'
import Testimonial from './Testimonial'
import HomeBanner from './HomeBanner'
import Locations from './Locations'

const StyledHeroBanner = styled.div`
    position: relative;

    width: 100%;
    
    height: 100vh;
    max-height: 2000px;
`

const Content = styled.div`
    position: absolute;
    
    top: 50%;

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
    inView,
    className,
    category,
    data
}) => {

    const {
        bannerType,
        tags,
        images,
        headerTitle,
        headerDescription,
        testimonial,
        internalLinks,
        externalLink,
        externalLinkLabel,
        contact
    } = data
    
    const titleSize = (bannerType == 'Home') ? 'extra-large' : (bannerType == 'Page') ? 'large' : 'small'

    return (
        <StyledHeroBanner className={className} type={bannerType}>
            {bannerType != 'Home' ? (
                <>
                    {images && (
                        <ImageWrapper>
                            {images.map(({ fluid, title }, i) => (
                                <StyledImage key={i} fluid={fluid} alt={title} />
                            ))}
                        </ImageWrapper>
                    )}
                    <Container>
                        <Content>
                            <Title
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
                            {contact && (
                                <Locations lang={lang} inView={inView} data={contact}/>
                            )}
                        </Content>
                    </Container>
                </>
            ) : <HomeBanner inView={inView} lang={lang} className={className} data={data} category={category} />}
        </StyledHeroBanner>
    )
}

export default HeroBanner
