import { graphql } from 'gatsby'

export const PageQuery = graphql`
    fragment PageQuery on ContentfulPage {
        name
        category
        slug
        components {
            ... on ContentfulComponentContact {
                ...ContactQuery
            }
            ... on ContentfulComponentContentBlock {
                ...ContentBlockQuery
            }
            ... on ContentfulComponentFaq {
                ...FaqQuery
            }
            ... on ContentfulComponentGrid {
                ...GridQuery
            }
            ... on ContentfulComponentHeroBanner {
                ...HeroBannerQuery
            }
            ... on ContentfulComponentHorizontalScroll {
                ...HorizontalScrollQuery
            }
            ... on ContentfulComponentInstagramFeed {
                ...InstagramFeedQuery
            }
            ... on ContentfulComponentJoinUs {
                ...JoinUsQuery
            }
            ... on ContentfulComponentUpcoming {
                ...UpcomingQuery
            }
        }
    }
`