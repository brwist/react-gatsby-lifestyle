import React, { useRef } from 'react'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'

import HorizontalDrag from './HorizontalDrag'
import HorizontalScroll from './HorizontalScroll'

const MobileDrag = styled(HorizontalDrag)`
    display: block;

    ${props => props.theme.above.desktop`
        display: none;
    `}
`

const DesktopScroll = styled(HorizontalScroll)`
    display: none;

    ${props => props.theme.above.desktop`
        display: block;
    `}
`

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
        hashtags, // If Instagram
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
                hashtags={hashtags} 
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
            <>
                <MobileDrag 
                    lang={lang} 
                    inView={inView} 
                    items={items}
                    hashtags={hashtags} 
                    component={component} 
                    type={type}
                    slug={slug}
                    information={itemsInformation}
                    backgroundColor={backgroundColor}
                    title={contentTitle}
                    description={contentDescription}
                    category={category}
                />
                <DesktopScroll 
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
            </>
        )
    }

}

const HorizontalSection = (props) => {
    return props.data.items != undefined && props.data.items.length > 0 ? renderComponent(props) : null
}

export default HorizontalSection