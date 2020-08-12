import { graphql } from 'gatsby'

export const UpcomingQuery = graphql`
    fragment UpcomingQuery on ContentfulComponentUpcoming {
        __typename
        componentTitle
        contentTitle {
            json
        }
        contentDescription {
            json
        }
        backgroundColor
        items {
            slug
            name
            title
            category
            featuredImage {
                title
                fluid(maxWidth: 720, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
        }
    }
`