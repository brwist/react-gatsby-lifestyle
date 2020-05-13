import React from 'react'

import Section from './Section'
import HeroBanner from './../HeroBanner'
import HorizontalScroll from './../Horizontal/HorizontalScroll'
import Faq from './../Faq'
import Grid from './../Grid'
import Upcoming from './../Upcoming'
import JoinUs from './../JoinUs'
import ContentBlock from './../ContentBlock'
import InstagramFeed from './../InstagramFeed'

const Constructor = ({ 
    lang,
    data,
    category,
    instagram
}) => {
    
    const renderComponent = (typename, component, inView, backgroundColor) => {
        console.log(typename)
        switch (typename) {
            case 'ContentfulComponentHeroBanner': return (
                <HeroBanner 
                    lang={lang}
                    inView={inView}
                    data={component}
                    category={category}
                />
            )
            case 'ContentfulComponentHorizontalScroll': return (
                <HorizontalScroll 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                    category={category}
                    backgroundColor={backgroundColor} 
                />
            )
            case 'ContentfulComponentFaq': return (
                <Faq lang={lang} inView={inView} data={component} />
            )
            case 'ContentfulComponentGrid': return (
                <Grid lang={lang} inView={inView} data={component} />
            )
            case 'ContentfulComponentUpcoming': return (
                <Upcoming lang={lang} inView={inView} data={component} />
            )
            case 'ContentfulComponentJoinUs': return (
                <JoinUs lang={lang} inView={inView} data={component} />
            )
            case 'ContentfulComponentContentBlock': return (
                <ContentBlock lang={lang} inView={inView} data={component} />
            )
            case 'ContentfulComponentInstagramFeed': return (
                <InstagramFeed lang={lang} inView={inView} data={component} items={instagram} backgroundColor={backgroundColor}/>
            )
        }
    }

    return (
        <>
            {data.map((component, i) => {
                
                const { 
                    __typename, 
                    backgroundColor, 
                    flowLine 
                } = component

                return (
                    <Section
                        key={i}
                        name={__typename}
                        layout={{
                            backgroundColor,
                            flowLine
                        }}
                    >
                        {inView => renderComponent(__typename, component, inView, backgroundColor)}
                    </Section>
                )
            })}    
        </>
    )
}

export default Constructor
