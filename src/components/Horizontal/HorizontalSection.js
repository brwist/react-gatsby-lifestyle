import React, { useRef } from 'react'

import HorizontalDrag from './HorizontalDrag'
import HorizontalScroll from './HorizontalScroll'

const renderComponent = ({ 
    lang,
    inView,
    category,
    slug,
    backgroundColor,
    data: {
        __typename,
        type, // Wave or Straight
        gesture, // Draggable or Scrollable
        itemsInformation, // Title and excerpt, Excerpt or Extended
        items,
        contentTitle,
        contentDescription
    }
}) => {

    const component = __typename.replace('ContentfulComponent', '')

    switch (gesture) {
        case 'Draggable': return (
            <HorizontalDrag 
                lang={lang} 
                inView={inView} 
                items={items} 
                component={component} 
                type={type}
                slug={slug}
                information={itemsInformation}
                backgroundColor={backgroundColor}
                title={contentTitle}
                description={contentDescription}
            />
        )
        case 'Scrollable': return (
            <HorizontalScroll 
                lang={lang} 
                inView={inView} 
                items={items} 
                component={component} 
                type={type} 
                slug={slug}
                information={itemsInformation}
                backgroundColor={backgroundColor}
                title={contentTitle}
                description={contentDescription}
            />
        )
    }
}

const HorizontalSection = (props) => {
    return props.data.items != undefined && props.data.items.length > 0 ? renderComponent(props) : null
}

export default HorizontalSection