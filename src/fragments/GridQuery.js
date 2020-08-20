import { graphql } from 'gatsby'

export const GridQuery = graphql`
    fragment GridQuery on ContentfulComponentGrid {
        __typename
        componentTitle
        category
        filterable
    }
`