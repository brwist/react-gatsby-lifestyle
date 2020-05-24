import { graphql } from 'gatsby'

export const GridQuery = graphql`
    fragment GridQuery on ContentfulComponentGrid {
        __typename
        componentTitle
        category
        filterable
        items {
            ...on ContentfulArticle {
                name
                category
                slug
                excerpt {
                    json
                }
                featuredImage {
                    title
                    fluid(maxWidth: 480, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                components {
                    ... on ContentfulComponentHeroBanner {
                        ...HeroBannerQuery
                    }
                }
            }
            ...on ContentfulPage {
                name
                category
                slug
                excerpt {
                    json
                }
                buttonLabel
                featuredImage {
                    title
                    fluid(maxWidth: 480, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                components {
                    ... on ContentfulComponentHeroBanner {
                        ...HeroBannerQuery
                    }
                }
            }
        }
    }
`