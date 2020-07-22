import { graphql } from 'gatsby'

export const ContentBlockQuery = graphql`
    fragment ContentBlockQuery on ContentfulComponentContentBlock {
        __typename
        blockTitle
        type
        contentTitle {
            json
        }
        contentDescription {
            json
        }
        images {
            title
            fluid(maxWidth: 720, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
        # video { 
            # videoUrl
            # videoSubtitle
            # placeholder {
            #     title
            #     fluid(maxWidth: 720, quality: 100) {
            #         ...GatsbyContentfulFluid_withWebp
            #     }
            # }
        # }
        flowLine
    }
`