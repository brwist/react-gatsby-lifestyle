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
        button {
            name
            label
            formInput
            internalLink {
                ... on ContentfulPage {
                    name
                    slug
                    internal {
                        type
                    }
                }
                ... on ContentfulPopup {
                    name
                    slug
                    internal {
                        type
                    }
                }
            }
        }
        image {
            title
            fluid(maxWidth: 600, quality: 80) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
    }
`