import React from 'react'

import Carousel from './Carousel'
import HorizontalSection from './HorizontalSection'

const renderComponent = (lang, inView, backgroundColor, data) => {
    
    const { 
        __typename,
        type, // Wave or Straight
        gesture, // Draggable or Scrollable
        itemsInformation, // Title and excerpt, Excerpt or Extended
        contentTitle,
        contentDescription,
        items
    } = data

    const component = __typename.replace('ContentfulComponent', '')

    switch (gesture) {
        case 'Draggable': return (
            <Carousel 
                lang={lang} 
                inView={inView} 
                items={items} 
                component={component} 
                type={type}
                information={itemsInformation}
                backgroundColor={backgroundColor}
                title={contentTitle}
                description={contentDescription}
            />
        )
        case 'Scrollable': return (
            <HorizontalSection 
                lang={lang} 
                inView={inView} 
                items={items} 
                component={component} 
                type={type} 
                information={itemsInformation}
                backgroundColor={backgroundColor}
                title={contentTitle}
                description={contentDescription}
            />
        )
    }
}

const HorizontalScroll = ({
    lang,
    inView,
    category,
    backgroundColor,
    data
}) => {
    return data.items != undefined && data.items.length > 0 ? renderComponent(lang, inView, backgroundColor, data) : null
}

export default HorizontalScroll