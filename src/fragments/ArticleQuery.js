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
        seoImage: featuredImage {
            fixed(width: 1200, height: 630, cropFocus: CENTER) {
                ...GatsbyContentfulFixed
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
        title
        author
        date(formatString: "DD / MM / YYYY")
        link
        linkLabel
        relatedArticles {
            slug
            title
            category
            featuredImage {
                title
                fluid(maxWidth: 400, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
        }
    }
`