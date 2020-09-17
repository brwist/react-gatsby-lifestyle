import React, { useRef } from 'react'
import { useWindowSize } from 'react-use'

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
        hashtag, // If Instagram
        contentTitle,
        contentDescription
    }
}) => {

    const { width: windowWidth } = useWindowSize()
    
    const component = __typename.replace('ContentfulComponent', '')

    if (windowWidth < 1023) {
        return (
            <HorizontalDrag 
                lang={lang} 
                inView={inView} 
                items={items}
                hashtag={hashtag} 
                component={component} 
                type={type}
                slug={slug}
                information={itemsInformation}
                backgroundColor={backgroundColor}
                title={contentTitle}
                description={contentDescription}
                category={category}
            />
        )
    } else {
        switch (gesture) {
            case 'Draggable': return (
                <HorizontalDrag 
                    lang={lang} 
                    inView={inView} 
                    items={items}
                    hashtag={hashtag} 
                    component={component} 
                    type={type}
                    slug={slug}
                    information={itemsInformation}
                    backgroundColor={backgroundColor}
                    title={contentTitle}
                    description={contentDescription}
                    category={category}
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
                    category={category}
                />
            )
        }
    }

}

const HorizontalSection = (props) => {
    return props.data.items != undefined && props.data.items.length > 0 ? renderComponent(props) : null
}

export default HorizontalSection