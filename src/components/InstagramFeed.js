import React from 'react'

import HorizontalSection from './Horizontal/HorizontalSection'

const InstagramFeed = ({
    lang,
    inView,
    items,
    hashtag,
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
                hashtag: hashtag,
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
