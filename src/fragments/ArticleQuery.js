import { graphql } from 'gatsby'

export const ArticleQuery = graphql`
    fragment ArticleQuery on ContentfulArticle {
        slug
        category
        featuredImage {
            title
            fluid(maxWidth: 1280, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
        excerpt {
            excerpt
        }
        components {
            ... on ContentfulComponentHeroBanner {
                ...HeroBannerQuery
            }
        }
        content {
            json
        }
        name
        author
        date
        link
    }
`