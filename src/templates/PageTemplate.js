import React from 'react'
import { graphql } from 'gatsby'

import Seo from './../components/Layout/Seo'
import Constructor from './../components/Layout/Constructor'

const PageTemplate = ({
    pageContext: {
        layout: {
            langSlug,
            slug
        }
    },
    data: {
        contentfulPage: {
            category,
            name,
            components
        },
        allInstaNode
    }
}) => {
    
    return (
        <>
            <Seo 
                title={name} 
            />
            <Constructor 
                lang={langSlug}
                slug={slug}
                category={category}
                data={components}
                instagram={allInstaNode}
            />
        </>
    )
}

export const query = graphql`
	query($id: String!, $instagram: String!) {
		contentfulPage(id: {eq: $id}) {
            ...PageQuery
        }
        allInstaNode(filter: {username: {eq: $instagram}}, limit: 12) {
            nodes {
                id
                username
                caption
                mediaType
                localFile {
                    childImageSharp {
                        fluid(maxWidth: 560, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }           
            }
        }
	}
`

export default PageTemplate
