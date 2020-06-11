import React from 'react'
import { graphql } from 'gatsby'

import Constructor from './../components/Layout/Constructor'

const NotFoundTemplate = ({
    pageContext: {
        layout: {
            langSlug,
            slug
        }
    },
    data: {
        contentfulPage: {
            category,
            components
        }
    }
}) => {
    return (
        <>
            <Constructor
                lang={langSlug}
                slug={slug}
                category={category}
                data={components}
            />
        </>
    )
}

export const query = graphql`
	query($id: String!) {
		contentfulPage(id: {eq: $id}) {
            ...PageQuery
        }
	}
`

export default NotFoundTemplate
