import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Container from './Layout/Container'
import Title from './Title'

const StyledHeroBanner = styled.div`
    position: relative;

    width: 100%;
    
    height: 100vh;
    max-height: 2000px;
`

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TitleWrapper = styled.div``

const StyledTitle = styled(Title)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const StyledDescription = styled(Title)`
    position: absolute;

    left: ${props => props.theme.desktopVW(120)};
    bottom: ${props => props.theme.desktopVW(120)};
`

const ImageLeft = styled.div`
    position: absolute;

    top: ${props => props.theme.desktopVW(240)};
    left: ${props => props.theme.desktopVW(240)};

    width: ${props => props.theme.desktopVW(480)};
    height: ${props => props.theme.desktopVW(600)};

    background-color: ${props => props.theme.colors.darkGrey};
`

const ImageRight = styled.div`
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

const HomeBanner = ({
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
        externalLinkLabel
    } = data

    return (
        <StyledHeroBanner className={className} type={bannerType}>
            {images && (
                <>
                    <ImageLeft>
                        <StyledImage fluid={images[0].fluid} alt={images[0].title} />
                    </ImageLeft>
                    <ImageRight>
                        <StyledImage fluid={images[1].fluid} alt={images[1].title} />
                    </ImageRight>
                </>
            )}
            <StyledContainer>
                <TitleWrapper>
                    <StyledTitle
                        lang={lang}
                        size='extra-large'
                        title={headerTitle}
                    />
                    <StyledDescription 
                        lang={lang}
                        tags={tags}
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
                </TitleWrapper>
            </StyledContainer>
        </StyledHeroBanner>
    )
}

export default HomeBanner
