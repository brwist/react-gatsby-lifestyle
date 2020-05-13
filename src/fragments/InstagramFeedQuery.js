import { graphql } from 'gatsby'

export const InstagramFeedQuery = graphql`
    fragment InstagramFeedQuery on ContentfulComponentInstagramFeed {
        __typename
        componentTitle
        contentTitle {
            json
        }
        contentDescription {
            json
        }
        gesture
        backgroundColor
        instagramHashtag
    }
`