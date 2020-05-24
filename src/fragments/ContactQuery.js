import { graphql } from 'gatsby'

export const ContactQuery = graphql`
    fragment ContactQuery on ContentfulComponentContact {
        __typename
        componentTitle
        contentTitle {
            json
        }
        contentDescription {
            json
        }
        image {
            title
            fluid(maxWidth: 1280, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
        locations {
            title
            instagram
            facebook
            address {
                json
            }
        }
    }
`