import React, { useState } from 'react'
import GlobalStyle from './GlobalStyle'

import ScrollComponent from './../ScrollComponent'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'
import Preloader from './Preloader'

const Layout = ({ 
	children,
	lang,
	location,
	contentTheme
}) => {
	
	const [menuOpen, setMenuOpen] = useState(false)
	const [showPreloader, setShowPreloader] = useState(false)
	const showFooter = location.pathname.includes('contact') || location.pathname.includes('404') ? false : true

  	return (
		<>
			<GlobalStyle
				shouldDisableScroll={menuOpen ? true : false}
			/>
			{showPreloader && <Preloader showPreloader={e => setShowPreloader(e)} />}
			<Header
				lang={lang}
				contentTheme={contentTheme}
				menuOpen={menuOpen}
				setMenuOpen={() => setMenuOpen(!menuOpen)}
			/>
			<Menu 
				lang={lang}
				contentTheme={contentTheme}
				menuOpen={menuOpen}
				setMenuOpen={() => setMenuOpen(!menuOpen)}
			/>
			{/* <ScrollComponent> */}
				<main>
					{children}
				</main>
            {/* </ScrollComponent> */}
			{showFooter && (
				<Footer
					lang={lang}
					contentTheme={contentTheme}
				/>
			)}
		</>
	)
}

export default Layout
