import { graphql } from 'gatsby'

export const HeroBannerQuery = graphql`
    fragment HeroBannerQuery on ContentfulComponentHeroBanner {
        __typename
        bannerTitle
        bannerType
        tags
        images {
            title
            fluid(maxWidth: 840, quality: 100) {
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
        externalLink
        externalLinkLabel
        testimonial {
            name
            image {
                title
                fluid(maxWidth: 60, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
            description {
                description
            }
        }
    }
`