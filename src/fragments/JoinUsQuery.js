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
            fluid(maxWidth: 600, quality: 80) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
    }
`