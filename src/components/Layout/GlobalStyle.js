import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import PlainLight from './../../fonts/Plain-Light.woff'
import PlainRegular from './../../fonts/Plain-Regular.woff'
// import NBInternationalProLight from './../../fonts/NBInternationalPro-Lig.woff'
import NBInternationalProRegular from './../../fonts/NBInternationalPro-Reg.woff'
// import NBInternationalProMedium from './../../fonts/NBInternationalPro-Medium.woff'
import NBInternationalProBold from './../../fonts/NBInternationalPro-Bold.woff'

const GlobalStyle = createGlobalStyle`
	${reset}

	@font-face {
        font-family: 'Plain Light';
		src: url('${PlainLight}') format('woff');
		font-style: normal;
		font-weight: normal;
	}

	@font-face {
        font-family: 'Plain Regular';
		src: url('${PlainRegular}') format('woff');
		font-style: normal;
		font-weight: normal;
	}

	@font-face {
        font-family: 'NB International Regular';
		src: url('${NBInternationalProRegular}') format('woff');
		font-style: normal;
		font-weight: normal;
	}

	@font-face {
        font-family: 'NB International Bold';
		src: url('${NBInternationalProBold}') format('woff');
		font-style: normal;
		font-weight: bold;
	}

	body {
		position: relative;
		
		background-color: ${props => props.theme.colors.dark};

		font-family: ${props => props.theme.fontFamilies.plainLight}, 'Arial', sans-serif;
		font-size: ${props => props.theme.desktopVW(20)};
		
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-ms-overflow-style: none;

		overflow: ${props => props.shouldDisableScroll ? 'hidden' : 'auto'};
		
		color: ${props => props.theme.colors.light};

		&::-webkit-scrollbar {
  			display: none;
		}

		&.ReactModal__Body--open {
			overflow: hidden;
		}
    }

	.viewport {
		position: fixed;
		
		width: 100vw;
		
		overflow-x: hidden;

		margin: 0 0 0 0;
	}

	main {
		position: relative;
	}

    *, *:before, *:after {
        box-sizing: border-box;
    }

	*:focus {
		outline:none;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	button,
	input {
		border: 0;
		background: transparent;
		margin: 0;
		padding: 0;
		outline: 0;
		-webkit-font-smoothing: antialiased;
	}

	input,
	textarea,
	button,
	select,
	div,
	a {
		-webkit-tap-highlight-color: transparent;
	}

	p {
		font-family: ${props => props.theme.fontFamilies.plainLight};
		font-size: ${props => props.theme.fontSizes.desktop.p};
		line-height: 1.35;
	}

	.ReactModal__Overlay {
		padding: ${props => props.theme.mobileVW(120)} 0;

		background-color: rgba(16, 16, 16, 0.8) !important;

		overflow: scroll;

		z-index: 2;
	}

	.popup-modal {
		position: relative;
		
		width: 100%;

		margin: 0 auto ${props => props.theme.mobileVW(120)} auto;
	}

	.headroom-wrapper {
		position: absolute;
	
		top: 0;
		left: 0;

		z-index: 4;

		width: 100%;
	}

	${props => props.theme.above.desktop`
		.ReactModal__Overlay {
			padding: ${props.theme.desktopVW(120)} 0;
		}

		.popup-modal {
			max-width: ${props.theme.desktopVW(1200)};

			margin: 0 auto ${props.theme.desktopVW(120)} auto;
		}
	`}
`

export default GlobalStyle
