import { graphql } from 'gatsby'

export const HeroBannerQuery = graphql`
    fragment HeroBannerQuery on ContentfulComponentHeroBanner {
        __typename
        bannerTitle
        bannerType
        tags
        images {
            title
            fluid(maxWidth: 1280, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
        headerTitle {
            json
        }
        headerDescription {
            json
        }
        internalLinks {
            title
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
        externalLink
        externalLinkLabel
        testimonial {
            name
            image {
                title
                fluid(maxWidth: 100, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
            description {
                description
            }
        }
    }
`