import React from 'react'

import Section from './Section'
import HeroBanner from './../HeroBanner'
import HorizontalSection from './../Horizontal/HorizontalSection'
import Faq from './../Faq'
import Grid from './../Grid'
import Upcoming from './../Upcoming'
import JoinUs from './../JoinUs'
import ContentBlock from './../ContentBlock'
import InstagramFeed from './../InstagramFeed'
import Contact from './../Contact'

const Constructor = ({ 
    lang,
    data,
    slug,
    category,
    instagram
}) => {
    
    const renderComponent = (typename, component, inView, slug, backgroundColor) => {
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
                <HorizontalSection 
                    lang={lang} 
                    inView={inView}
                    slug={slug}
                    data={component} 
                    category={category}
                    backgroundColor={backgroundColor} 
                />
            )
            case 'ContentfulComponentFaq': return (
                <Faq 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                />
            )
            case 'ContentfulComponentGrid': return (
                <Grid 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                />
            )
            case 'ContentfulComponentUpcoming': return (
                <Upcoming 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                />
            )
            case 'ContentfulComponentJoinUs': return (
                <JoinUs 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                />
            )
            case 'ContentfulComponentContentBlock': return (
                <ContentBlock 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                />
            )
            case 'ContentfulComponentInstagramFeed': return (
                <InstagramFeed 
                    lang={lang} 
                    inView={inView} 
                    data={component} 
                    items={instagram} 
                    backgroundColor={backgroundColor}
                />
            )
            case 'ContentfulComponentContact': return (
                <Contact
                    lang={lang}
                    inView={inView}
                    data={component}
                    backgroundColor={backgroundColor}
                />
            )
        }
    }

    if (data && data.length) {
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
                            {inView => renderComponent(__typename, component, inView, slug, backgroundColor)}
                        </Section>
                    )
                })}
            </>
        )
    } else if (data) {

        const {
            __typename,
            backgroundColor,
            flowLine
        } = data

        return (
            <Section
                name={__typename}
                layout={{
                    backgroundColor,
                    flowLine
                }}
            >
                {inView => renderComponent(__typename, data, inView, slug, backgroundColor)}
            </Section>
        )
    } else {
        return null
    }
}

export default Constructor
