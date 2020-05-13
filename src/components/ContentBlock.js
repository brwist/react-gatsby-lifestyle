import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Title from './Title'
import Video from './Video'
import TextRenderer from './TextRenderer'

import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

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
`

const ContentBlock = ({
    lang,
    inView,
    data: {
        flowLine, 
        type,
        contentTitle,
        contentDescription,
        mediaType,
        images,
        video
    }
}) => {

    const offset = 160

    const params = {
        spaceBetween: offset,
        slidesOffsetBefore: offset,
        slidesOffsetAfter: offset,
        slidesPerView: 'auto',
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        }
    }
    
    return (
        <>
            <Wrapper type={type}>
                <Media>
                    {images && images.length > 1 ? (
                        <StyledImage
                            key={i}
                            fluid={fluid}
                            alt={title}
                        />
                    ) : (
                        <Swiper {...params}>
                            {images.map((image, i) => (
                                <StyledImage
                                    key={i}
                                    fluid={image.fluid}
                                    alt={image.title}
                                />
                            ))}
                        </Swiper>
                    )}
                    {video && (
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
        </>
    )
}

export default ContentBlock
