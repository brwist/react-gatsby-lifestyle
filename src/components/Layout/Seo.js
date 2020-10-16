import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Seo = ({
    lang,
    title,
    meta,
    description,
    keywords,
    image
}) => {

    const { theme } = useStaticQuery(graphql`
		query {
			theme: contentfulTheme {
                title
                seoDescription {
                    seoDescription
                }
                seoKeywords
                seoImage {
                    fixed(width: 1200, height: 630, quality: 70) {
                        ...GatsbyContentfulFixed
                    }
                }
			}
		}
    `)

    const siteName = theme.title || 'Rockstar Lifestyle'
    const metaImage = image != null ? image.fixed.src : theme.seoImage.fixed.src
    const metaTitle = title ? `${siteName} - ${title}` : siteName
    const metaDescription = description || theme.seoDescription.seoDescription
    const metaKeywords = keywords || theme.seoKeywords.join(', ')

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={`${title} - Rockstar Lifestyle`}
            meta={[
                {
                    name: `viewport`,
                    content: `width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no`,
                },
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: `keywords`,
                    content: metaKeywords,
                },
                {
                    name: `language`,
                    content: lang,
                },
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: metaImage,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:title`,
                    content: metaTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                }
            ].concat(meta)}
        ></Helmet>
    )
}

Seo.defaultProps = {
    lang: `en`,
    meta: [],
    title: ``,
    description: ``,
    keywords: ``,
    image: ``
}

Seo.propTypes = {
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
}

export default Seo