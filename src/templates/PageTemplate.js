import React from 'react'
import { graphql } from 'gatsby'

import Seo from './../components/Layout/Seo'
import Constructor from './../components/Layout/Constructor'

const PageTemplate = ({
    pageContext: {
        instagram: instagramHashtags,
        layout: {
            langSlug,
            slug
        }
    },
    data: {
        contentfulPage: {
            category,
            name,
            components,
            seoImage,
            seoTitle
        },
        instaNodes,
        robertInstaNodes
    }
}) => {
    return (
        <>
            <Seo 
                title={seoTitle || name} 
                image={seoImage && seoImage}
            />
            <Constructor 
                lang={langSlug}
                slug={slug}
                category={category}
                data={components}
                instagram={{
                    items: slug == 'robert-stols' ? robertInstaNodes : instaNodes,
                    hashtags: instagramHashtags
                }}
            />
        </>
    )
}

export const query = graphql`
	query($id: String!) {
		contentfulPage(id: {eq: $id}) {
            ...PageQuery
        }
        instaNodes: allInstaNode {
            nodes {
                id
                username
                caption
                mediaType
                localFile {
                    url
                }           
            }
        }
        robertInstaNodes: allInstaNode(filter: {
            username: {
                eq: "2610360"
            }
        }) {
            nodes {
                id
                username
                caption
                mediaType
                localFile {
                    url
                } 
            }
        }
	}
`

export default PageTemplate
