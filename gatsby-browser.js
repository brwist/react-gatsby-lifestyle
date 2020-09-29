import React from 'react'
import Provider from './src/components/Layout/Provider'
import Layout from './src/components/Layout/Layout'
import { DictionaryContext } from './src/contexts/dictionary'

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>

export const wrapPageElement = ({
    element,
    props: {
        location,
        pageContext: {
            dictionary,
            layout,
            theme,
            instagram
        }
    }
}) => {
    return (
        <DictionaryContext.Provider value={dictionary && dictionary.data}>
            <Layout
                lang={layout.langSlug}
                location={location}
                contentLayout={layout}
                contentTheme={theme}
                contentInstagram={instagram}
            >
                {element}
            </Layout>
        </DictionaryContext.Provider>
    )
}

export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition
}) => {
    if (location.action === "PUSH") {
        window.setTimeout(() => window.scrollTo(0, 0), 500);
    } else {
        const savedPosition = getSavedScrollPosition(location);
        window.setTimeout(
            () => window.scrollTo(...(savedPosition || [0, 0])),
            500
        );
    }
    return false;
}