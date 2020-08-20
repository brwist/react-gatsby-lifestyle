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
    }
`