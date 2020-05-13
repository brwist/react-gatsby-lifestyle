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
                    subItems {
                        ... on ContentfulPage {
                            name
                            slug
                            internal {
                                type
                            }
                        }
                        ... on ContentfulPopup {
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
                components {
                    ... on ContentfulComponentInstagramFeed {
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
        pages.forEach(({ id, category, __typename, node_locale, slug, type, components }) => {
            
            const hashtag = components && components[0].instagramHashtag != undefined ? components[0].instagramHashtag : 'rockstarlifestyleamsterdam'
            const template = __typename.replace('Contentful', '')
            const prefix = category == 'Normal' || category == 'World' ? slug : `${category.toLowerCase()}/${slug}`

            if (node_locale === locale) {
                createPage({
                    path: generatePath(langSlug, prefix),
                    component: path.resolve(`./src/templates/${slug === '404' ? 'NotFound' : template}Template.js`),
                    context: {
                        id,
                        layout: {
                            langSlug,
                            langSettings,
                            type,
                            template
                        },
                        theme: themes[node_locale],
                        dictionary: dictionaries[node_locale],
                        instagram: hashtag
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