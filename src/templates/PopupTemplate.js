import React from 'react'
import { graphql, Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import styled from 'styled-components'

import PopupPage from './../components/Popup/Page'
import PopupModal from './../components/Popup/Modal'

const StyledModal = styled.div`
    background-color: ${props => props.theme.colors.dark};
`

const PopupTemplate = ({
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
    return (
        <ModalRoutingContext.Consumer>
            {({ modal, closeTo }) => (
                <StyledModal>
                    {modal ? (
                        <PopupModal 
                            lang={langSlug}
                            data={contentfulPopup}
                            closeTo={closeTo}
                            slug={slug}
                        />
                    ) : (
                        <PopupPage 
                            lang={langSlug}
                            data={contentfulPopup}
                            slug={slug}
                        />
                    )}
                </StyledModal>
            )}
        </ModalRoutingContext.Consumer>
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
