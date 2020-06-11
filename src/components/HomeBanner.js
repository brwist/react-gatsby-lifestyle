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
    justify-content: flex-start;
    align-items: center;

    padding-top: ${props => props.theme.mobileVW(150)};
    
    ${props => props.theme.above.desktop`
        justify-content: center;

        padding-top: 0;
    `}
`

const TitleWrapper = styled.div``

const StyledTitle = styled(Title)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const StyledDescription = styled(Title)`
    position: absolute;

    left: 0;
    bottom: ${props => props.theme.sizes.mobile};

    padding: 0 ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        left: ${props.theme.desktopVW(120)};
        bottom: ${props.theme.desktopVW(120)};

        padding: 0;
    `}
`

const ImageLeft = styled.div`
    position: absolute;

    top: 50%;
    left: 0;

    transform: translateY(-50%);

    width: ${props => props.theme.mobileVW(129)};
    height: ${props => props.theme.mobileVW(240)};

    background-color: ${props => props.theme.colors.darkGrey};

    ${props => props.theme.above.desktop`
        top: ${props.theme.desktopVW(240)};
        left: ${props.theme.desktopVW(240)};

        transform: none;

        width: ${props.theme.desktopVW(480)};
        height: ${props.theme.desktopVW(600)};
    `}
`

const ImageRight = styled.div`
    position: absolute;

    top: 50%;
    right: 0;

    transform: translateY(-50%);

    width: ${props => props.theme.mobileVW(188)};
    height: ${props => props.theme.mobileVW(432)};

    background-color: ${props => props.theme.colors.darkGrey};

    ${props => props.theme.above.desktop`
        top: 0;
        
        transform: none;
        
        width: 50vw;
        height: 100%;
    `}
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
