import React from 'react'
import { graphql } from 'gatsby'

import Constructor from './../components/Layout/Constructor'

const ArticleTemplate = ({
    pageContext: {
        layout: {
            langSlug
        }
    },
    data: {
        contentfulArticle: {
            category,
            components
        }
    }
}) => {
    return (
        <>
            <Constructor
                lang={langSlug}
                category={category}
                data={components}
            />
        </>
    )
}

export const query = graphql`
	query($id: String!) {
		contentfulArticle(id: {eq: $id}) {
            ...ArticleQuery
        }
	}
`

export default ArticleTemplate
