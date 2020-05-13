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