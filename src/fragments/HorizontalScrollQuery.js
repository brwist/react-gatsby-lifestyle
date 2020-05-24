import { graphql } from 'gatsby'

export const HorizontalScrollQuery = graphql`
    fragment HorizontalScrollQuery on ContentfulComponentHorizontalScroll {
        __typename
        gesture
        type
        itemsInformation
        componentTitle
        backgroundColor
        flowLine
        contentTitle {
            json
        }
        contentDescription {
            json
        }
        items {
            ...on ContentfulPage {
                name
                slug
                category
                excerpt {
                    json
                }
                featuredImage {
                    title
                    fluid(maxWidth: 560, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                components {
                    ... on ContentfulComponentHeroBanner {
                        ...HeroBannerQuery
                    }
                }
            }
            ...on ContentfulService {
                name
                excerpt {
                    json
                }
                buttonLabel
                buttonLink
                featuredImage {
                    title
                    fluid(maxWidth: 560, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
        }
    }
`