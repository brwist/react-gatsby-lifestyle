import { graphql } from 'gatsby'

export const FaqQuery = graphql`
    fragment FaqQuery on ContentfulComponentFaq {
        __typename
        componentTitle
        contentTitle {
            json
        }
        items {
            question
            category
            answer {
                json
            }
            image {
                title
                fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
        }
    }
`