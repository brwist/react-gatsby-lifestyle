import React from 'react'

import HorizontalScroll from './Horizontal/HorizontalScroll'

const InstagramFeed = ({
    lang,
    inView,
    items,
    backgroundColor
}) => {
    return (
        <HorizontalScroll
            lang={lang} 
            inView={inView} 
            data={{
                __typename: 'ContentfulComponentInstagramFeed',
                items: items.nodes,
                style: 'Straight',
                itemsInformation: 'Excerpt only',
                gesture: 'Draggable'
            }}
            category='Instagram'
            backgroundColor={backgroundColor}
        />
    )
}

export default InstagramFeed
