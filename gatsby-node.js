const path = require('path')
const R = require('ramda')

const generatePath = (lang, slug) => `${lang.substring(0, 2)}/${slug ? `${slug}/` : ''}`

const pageNodes = `
    id
    contentful_id
    __typename
    category
    node_locale
    slug
`

const langSettings = [
    {
        locale: 'en-US',
        langSlug: '',
        name: 'EN',
        hrefLang: ['en-gb']
    },
    {
        locale: 'nl-NL',
        langSlug: 'nl',
        name: 'NL',
        hrefLang: ['nl-nl']
    }
]

exports.createPages = async ({ graphql, actions: { createPage } }) => {

    const {
        data: {
            allContentfulDictionary
        }
    } = await graphql(`{
        allContentfulDictionary {
            nodes {
                node_locale
                open
                close
                joinUs
                readMore
                seeMorePosts
                events
                news
                getInTouch
            }
        }
    }`)

    const {
        data: {
            allContentfulTheme
        }
    } = await graphql(`{
        allContentfulTheme {
            nodes {
                node_locale
                title
                menu {
                    mainItems {
                        name
                        slug
                        internal {
                            type
                        }
                    }
                    menuItems {
                        name
                        slug
                        internal {
                            type
                        }
                    }
                    subItems {
                        ... on ContentfulPage {
                            name
                            slug
                            internal {
                                type
                            }
                        }
                    }
                    footerItems {
                        ... on ContentfulPopup {
                            name
                            slug
                            internal {
                                type
                            }
                        }
                    }
                }
                instagram
                facebook
                footerText {
                    json
                }
            }
        }
    }`)

    const { data: pageQuery } = await graphql(`{
        allContentfulPage {
            nodes {
                ${pageNodes}
                hidden
                components {
                    ... on ContentfulComponentInstagramFeed {
                        __typename
                        instagramHashtag
                    }
                }
            }
        }
        allContentfulArticle {
            nodes {
                ${pageNodes}
            }
        }
        allContentfulPopup {
            nodes {
                id
                contentful_id
                __typename
                node_locale
                slug
            }
        }
    }`)

    const groupByLocale = R.compose(
        R.indexBy(R.prop('node_locale')),
        R.prop('nodes')
    )

    const dictionaries = groupByLocale(allContentfulDictionary)
    const themes = groupByLocale(allContentfulTheme)
    
    const pages = R.compose(
        R.flatten,
        R.map(R.prop('nodes')),
        R.values
    )(pageQuery)

    langSettings.forEach(({ locale, langSlug }) => {    
        pages.forEach(({ id, category, __typename, node_locale, slug, type, hidden, components }) => {
            
            let hashtag
            let prefix
            const template = __typename.replace('Contentful', '')

            // Get Instagram hashtag
            if (components) {
                components.forEach((item) => {
                    if (item.__typename == 'ContentfulComponentInstagramFeed') {
                        hashtags = item.instagramHashtag
                    }
                })
            }

            // If no hashtag set to fallback
            if (hashtags == null) {
                hashtags = ['all']
            }

            // Get page category slug prefix
            if (category) {
                
                if (category == 'Normal' || category == 'Worlds') {
                    prefix = slug
                } else if (category == 'Trainers') {
                    prefix = `performance/trainers/${slug}`
                } else if (category == 'Events' || category == 'Trips') {
                    prefix = `events-and-trips/${category.toLowerCase()}/${slug}`
                } else if (category == 'News' || category == 'Knowledge' || category == 'Recipes') {
                    prefix = `blog/${category.toLowerCase()}/${slug}`
                } else if (category == 'Performance' || category == 'Careers') {
                    prefix = `${category.toLowerCase()}/${slug}`
                } else if (category == 'Workshops') {
                    prefix = `spirit/${category.toLowerCase()}/${slug}`
                }

            } else {
                prefix = slug
            }

            if (node_locale === locale && !hidden) {
                createPage({
                    path: generatePath(langSlug, prefix),
                    component: path.resolve(`./src/templates/${slug === '404' ? 'NotFound' : template}Template.js`),
                    context: {
                        id,
                        layout: {
                            langSlug,
                            langSettings,
                            slug,
                            type,
                            template
                        },
                        theme: themes[node_locale],
                        dictionary: dictionaries[node_locale],
                        instagram: hashtags
                    }
                })
            }
        })
    })

}

exports.onCreateNode = ({ actions: { createRedirect } }) => {
    langSettings.map(({ langSlug }) => {
        createRedirect({
            fromPath: langSlug ? `/${langSlug}/` : '/',
            toPath: langSlug ? `/${langSlug}/404` : '/404',
            statusCode: 404
        })
    })
}