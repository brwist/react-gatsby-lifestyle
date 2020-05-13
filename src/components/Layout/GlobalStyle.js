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
		background-color: ${props => props.theme.colors.dark};

		font-family: ${props => props.theme.fontFamilies.plainLight}, 'Arial', sans-serif;
		font-size: ${props => props.theme.desktopVW(20)};
		
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		overflow: ${props => props.shouldDisableScroll ? 'hidden' : 'auto'};
		
		color: ${props => props.theme.colors.light};
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
		font-family: ${props => props.theme.fontFamilies.plainLight}, 'Arial', sans-serif;
		font-size: ${props => props.theme.fontSizes.desktop.p};
		line-height: 1.5;
	}

	h4 {
		font-family: ${props => props.theme.fontFamilies.plainLight};
		font-size: ${props => props.theme.fontSizes.desktop.h6};
		line-height: 1.3;
	}
`

export default GlobalStyle