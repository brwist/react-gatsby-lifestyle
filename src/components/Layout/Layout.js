import React, { useEffect, useState } from 'react'
import GlobalStyle from './GlobalStyle'

import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ 
	children,
	lang,
	contentTheme
}) => {
	
	const [menuOpen, setMenuOpen] = useState(false)

  	return (
		<>
			<GlobalStyle
				shouldDisableScroll={menuOpen ? true : false}
			/>
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
			<main>
				{children}
			</main>
			<Footer
				lang={lang}
				contentTheme={contentTheme}
			/>
		</>
	)
}

export default Layout
