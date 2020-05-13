import { graphql } from 'gatsby'

export const JoinUsQuery = graphql`
    fragment JoinUsQuery on ContentfulComponentJoinUs {
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
            fluid(maxWidth: 500, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
    }
`