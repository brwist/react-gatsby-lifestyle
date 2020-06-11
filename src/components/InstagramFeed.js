import React from 'react'

import HorizontalSection from './Horizontal/HorizontalSection'

const InstagramFeed = ({
    lang,
    inView,
    items,
    backgroundColor,
    data: {
        contentTitle,
        contentDescription
    },
}) => {
    return (
        <HorizontalSection
            lang={lang} 
            inView={inView} 
            data={{
                __typename: 'ContentfulComponentInstagramFeed',
                items: items.nodes,
                type: 'Straight',
                itemsInformation: 'Excerpt only',
                gesture: 'Draggable',
                contentTitle: contentTitle,
                contentDescription: contentDescription
            }}
            category='Instagram'
            backgroundColor={backgroundColor}
        />
    )
}

export default InstagramFeed
