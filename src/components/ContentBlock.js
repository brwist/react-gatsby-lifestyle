import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Container from './Layout/Container'
import Title from './Title'
import Video from './Video'
import Carousel from './Carousel'
import TextRenderer from './TextRenderer'

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: column;

    position: relative;

    padding-bottom: calc(${props => props.theme.sizes.mobile} * 5);

    ${props => props.theme.above.desktop`
        flex-direction: ${props.type == 'Media Left' ? 'row' : 'row-reverse'};
        justify-content: space-between;
        align-items: center;

        padding-top: calc(${props.theme.sizes.desktop} * 10);
        padding-bottom: calc(${props.theme.sizes.desktop} * 10);
    `}
`

const Media = styled.div`
    position: relative;
    
    // width: calc(100% - calc(${props => props.theme.sizes.mobile} * 3));
    width: 100%;
    height: auto;

    margin-bottom: calc(${props => props.theme.sizes.mobile} * 1.5);

    background-color: ${props => props.theme.colors.darkGrey};

    overflow: hidden;

    .swiper-scrollbar {
        left: 50%;
        bottom: calc(${props => props.theme.sizes.mobile} / 2);

        transform: translateX(-50%);

        height: 3px;
        width: ${props => props.theme.mobileVW(75)};
        
        background-color: rgba(255, 255, 255, 0.1);

        .swiper-scrollbar-drag {
            background-color: ${props => props.theme.colors.white};
        }
    }
    
    ${props => props.theme.above.desktop`
        width: ${props.theme.desktopVW(720)};
        height: ${props.theme.desktopVW(720)};

        margin-bottom: 0;

        .swiper-scrollbar {
            bottom: calc(${props.theme.sizes.desktop} * 2);

            width: ${props.theme.desktopVW(160)};
        }
    `}
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;

    object-fit: cover;
`

const Content = styled.div`
    padding: 0 ${props => props.theme.sizes.mobile};

    ${props => props.theme.above.desktop`
        ${props.order == 'left' ? `
            padding: 0 ${props.theme.desktopVW(160)} 0 ${props.theme.desktopVW(80)};
        ` : `
            padding: 0 ${props.theme.desktopVW(80)} 0 ${props.theme.desktopVW(80)};
        `}
    `}
`

const StyledTitle = styled(Title)`
    // overflow: hidden;

    .heading {
        margin-left: 0;

        // white-space: nowrap;
    }

    h4 {
        margin-bottom: ${props => props.theme.sizes.mobile};

		font-family: ${props => props.theme.fontFamilies.plainLight};
		font-size: ${props => props.theme.fontSizes.mobile.p};
		line-height: 1.3;
    }
    
    ${props => props.theme.above.desktop`
        h4 {
            margin-bottom: ${props.theme.sizes.desktop};

            font-size: ${props.theme.fontSizes.desktop.h6};
        }
    `}
`

const ContentBlock = ({
    lang,
    inView,
    data: {
        flowLine, 
        type,
        contentTitle,
        contentDescription,
        images,
        video
    }
}) => {

    const params = {
        slidesPerView: 1,
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        }
    }

    return (
        <Wrapper type={type}>
            <Media>
                {images && !video && images.length > 1 && (
                    <Carousel params={params}>
                        {images.map((image, i) => (
                            <StyledImage
                                key={i}
                                fluid={image.fluid}
                                alt={image.title}
                            />
                        ))}
                    </Carousel>
                )}
                {images && !video && images.length == 1 && (
                    <>
                        {images.map((image, i) => (
                            <StyledImage
                                key={i}
                                fluid={image.fluid}
                                alt={image.title}
                            />
                        ))}
                    </>
                )}
                {video && !images && (
                    <Video
                        url={video.videoUrl}
                        placeholder={video.placeholder}
                        inView={inView}
                    />
                )}
            </Media>
            <Content order={type == 'Media Left' ? 'right' : 'left'}>
                <StyledTitle 
                    lang={lang}
                    title={contentTitle}
                    description={contentDescription}
                    size='normal'
                />  
            </Content>
        </Wrapper>
    )
}

export default ContentBlock
