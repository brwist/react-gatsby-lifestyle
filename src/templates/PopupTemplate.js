import React from 'react'
import { graphql } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

import Seo from './../components/Layout/Seo'
import PopupPage from './../components/Popup/Page'
import PopupModal from './../components/Popup/Modal'

const PopupTemplate = ({
    location,
    pageContext: {
        layout: {
            langSlug,
            slug
        }
    },
    data: {
        contentfulPopup
    }
}) => {
    
    const { 
        name,
        seoImage 
    } = contentfulPopup

    const formInput = location.state ? location.state.formInput : ''

    return (
        <>
            <Seo 
                title={name}
                image={seoImage}
            />
            <ModalRoutingContext.Consumer>
                {({ modal, closeTo }) => (
                    <>
                        {modal ? (
                            <PopupModal 
                                lang={langSlug}
                                data={contentfulPopup}
                                closeTo={closeTo}
                                slug={slug}
                                formInput={formInput}
                            />
                        ) : (
                            <PopupPage 
                                lang={langSlug}
                                data={contentfulPopup}
                                slug={slug}
                                formInput={formInput}
                            />
                        )}
                    </>
                )}
            </ModalRoutingContext.Consumer>
        </>
    )
}

export const query = graphql`
	query($id: String!) {
		contentfulPopup(id: {eq: $id}) {
            ...PopupQuery
        }
	}
`

export default PopupTemplate
