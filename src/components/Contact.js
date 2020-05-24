import React from 'react'
import styled from 'styled-components'

import HeroBanner from './HeroBanner'

const StyledHeroBanner = styled(HeroBanner)`
    .description-wrapper {
        margin-bottom: ${props => props.theme.desktopVW(120)};
    }
    
    .description {
        font-size: ${props => props.theme.fontSizes.desktop.h6};
    }
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
