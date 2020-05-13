import { graphql } from 'gatsby'

export const GridQuery = graphql`
    fragment GridQuery on ContentfulComponentGrid {
        __typename
        componentTitle
        category
        items {
            ...on ContentfulArticle {
                name
                category
                slug
                featuredImage {
                    title
                    fluid(maxWidth: 480, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
            ...on ContentfulPage {
                name
                category
                slug
            }
        }
    }
`