import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Title from './Title'
import Video from './Video'
import Carousel from './Carousel'
import TextRenderer from './TextRenderer'

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${props => props.type == 'Media Left' ? 'row' : 'row-reverse'};
    justify-content: center;
    align-items: center;

    position: relative;

    padding: calc(${props => props.theme.sizes.desktop} * 10) 0;
`

const Media = styled.div`
    position: relative;
    
    width: ${props => props.theme.desktopVW(720)};
    height: ${props => props.theme.desktopVW(720)};

    background-color: ${props => props.theme.colors.darkGrey};

    overflow: hidden;

    .swiper-scrollbar {
        left: 50%;
        bottom: calc(${props => props.theme.sizes.desktop} * 2);

        transform: translateX(-50%);

        width: ${props => props.theme.desktopVW(160)};
        
        background-color: rgba(255, 255, 255, 0.1);

        .swiper-scrollbar-drag {
            background-color: ${props => props.theme.colors.white};
        }
	}
`

const StyledImage = styled(Image)``

const Content = styled.div`
    ${props => props.order == 'left' ? `
        padding: 0 ${props.theme.desktopVW(160)} 0 0;
    ` : `
        padding: 0 0 0 ${props.theme.desktopVW(80)};
    `}
`

const StyledTitle = styled(Title)`
    .heading {
        margin-left: 0;
    }

    h4 {
		font-family: ${props => props.theme.fontFamilies.plainLight};
		font-size: ${props => props.theme.fontSizes.desktop.h6};
		line-height: 1.3;
	}
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
