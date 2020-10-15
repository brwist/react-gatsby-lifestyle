import { graphql } from 'gatsby'

export const HorizontalScrollQuery = graphql`
    fragment HorizontalScrollQuery on ContentfulComponentHorizontalScroll {
        __typename
        gesture
        type
        itemsInformation
        componentTitle
        backgroundColor
        flowLine
        scrollToId
        contentTitle {
            json
        }
        contentDescription {
            json
        }
        items {
            ...on ContentfulPage {
                name
                slug
                category
                excerptTitle
                buttonLabel
                registerButton {
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
                excerpt {
                    json
                }
                featuredImage {
                    title
                    fluid(maxWidth: 480, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                components {
                    ... on ContentfulComponentHeroBanner {
                        ...HeroBannerQuery
                    }
                }
            }
            ...on ContentfulService {
                name
                excerptTitle
                excerpt {
                    json
                }
                buttonLabel
                buttonLink
                featuredImage {
                    title
                    fluid(maxWidth: 480, quality: 100) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
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
        }
    }
`