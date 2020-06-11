import React from 'react'
import styled from 'styled-components'

import HeroBanner from './HeroBanner'

const StyledHeroBanner = styled(HeroBanner)`
    .description-wrapper {
        margin-bottom: ${props => props.theme.sizes.mobile};
    }
    
    .description {
        font-size: ${props => props.theme.fontSizes.mobile.s};
    }

    ${props => props.theme.above.desktop`
        .description-wrapper {
            margin-bottom: calc(${props.theme.sizes.desktop} * 3);
        }
        
        .description {
            font-size: ${props.theme.fontSizes.desktop.h6};
        }
    `}
`

const Contact = ({
    lang, 
    inView,
    data: {
        contentTitle,
        contentDescription,
        image,
        locations
    }
}) => {
    return (
        <StyledHeroBanner 
            lang={lang}
            inView={inView}
            data={{
                bannerType: 'Page',
                headerTitle: contentTitle,
                headerDescription: contentDescription,
                images: [image],
                contact: locations
            }}
        />
    )
}

export default Contact
