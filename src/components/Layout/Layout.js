import React, { useContext, useState, useRef, useEffect } from 'react'

import GlobalStyle from './GlobalStyle'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'
import Preloader from './Preloader'
import SmoothScroll from '../SmoothScroll'
import Grain from './Grain'

import { PreloaderContext } from './../../contexts/preloader'

const Layout = ({ 
	children,
	lang,
	location,
	contentTheme
}) => {
	
	const [menuOpen, setMenuOpen] = useState(false)
	const [showPreloader, setShowPreloader] = useState(false)
	const showFooter = location.pathname.includes('contact') || location.pathname.includes('404') ? false : true

	const toggleMenuHandler = () => {
		setMenuOpen(!menuOpen)
	}

  	return (
		<PreloaderContext.Provider value={showPreloader ? 'preloader' : 'no-preloader'}>
			<GlobalStyle shouldDisableScroll={menuOpen ? true : false} />
			{showPreloader && (
				<Preloader showPreloader={e => setShowPreloader(e)} />
			)}
			<Header
				lang={lang}
				contentTheme={contentTheme}
				menuOpen={menuOpen}
				setMenuOpen={toggleMenuHandler}
				location={location}
			/>
			<Menu
				lang={lang}
				contentTheme={contentTheme}
				menuOpen={menuOpen}
				currentLocation={location}
				setMenuOpen={toggleMenuHandler}
			/>
			<main>
				{children}
			</main>
			{showFooter && (
				<Footer
					lang={lang}
					contentTheme={contentTheme}
				/>
			)}
		</PreloaderContext.Provider>
	)
}

export default Layout
