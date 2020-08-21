import { graphql } from 'gatsby'

export const PageQuery = graphql`
    fragment PageQuery on ContentfulPage {
        name
        category
        slug
        hidden
        featuredImage {
            title
            fluid(maxWidth: 1280, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
        excerpt {
            excerpt
        }
        title: name
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