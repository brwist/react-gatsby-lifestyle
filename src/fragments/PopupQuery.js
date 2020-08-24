import { graphql } from 'gatsby'

export const PopupQuery = graphql`
    fragment PopupQuery on ContentfulPopup {
        name
        slug
        components {
            ... on ContentfulComponentHeroBanner {
                ...HeroBannerQuery
            }
        }
        contentTitle
        contentDescription {
            json
        }
        testimonial {
            name
            image {
                title
                fluid(maxWidth: 100, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
            description {
                description
            }
        }
        image {
            title
            fluid(maxWidth: 1200, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
        seoImage: image {
            fixed(width: 1200, height: 630, cropFocus: CENTER) {
                ...GatsbyContentfulFixed
            }
        }
    }
`