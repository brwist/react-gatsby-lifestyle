import { css } from 'styled-components'

const mobileVW = px => {
    const number = (px / 375) * 100
    return `${number.toFixed(2)}vw`
}

const desktopVW = px => {
    const number = (px / 1920) * 100
    return `${number.toFixed(2)}vw`
}

const breakpoints = {
    desktop: 1023,
    wide: 1440,
    maxWidth: 1600,
    extraWide: 1920
}

const colors = {
    white: '#fff',
    light: '#e0e2e4',
    silver: '#c9cccc',
    coolGrey: '#a6afb0',
    darkGrey: '#242525',
    dark: '#101010',
    black: '#000',
    green: '#697366',
    yellow: '#ef993b',
    orange: '#ECA53A'
}

const fontFamilies = {
    plainLight: 'Plain Light',
    plainRegular: 'Plain Regular',
    nbRegular: 'NB International Regular',
    nbBold: 'NB International Bold'
}

const fontSizes = {
    mobile: {
        h1: mobileVW(75),
        h2: mobileVW(60),
        h3: mobileVW(50),
        h4: mobileVW(40),
        h5: mobileVW(30),
        h6: mobileVW(24),
        p: mobileVW(18),
        m: mobileVW(16),
        s: mobileVW(14),
        xs: mobileVW(12),
        xxs: mobileVW(10)
    },
    desktop: {
        h1: desktopVW(200),
        h2: desktopVW(144),
        h3: desktopVW(112),
        h4: desktopVW(64),
        h5: desktopVW(40),
        h6: desktopVW(24),
        p: desktopVW(18),
        m: desktopVW(16),
        s: desktopVW(14),
        xs: desktopVW(12),
        xxs: desktopVW(10)
    }
}

const sizes = {
    mobile: mobileVW(32),
    desktop: desktopVW(32)
}

const styles = {
    flexBox: {
        horCen: css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        `
    },
    inlineBlock: {
        verCen: css`
            display: inline-block;
            vertical-align: middle;
        `
    },
    image: {
        objectCover: css`
            width: 100%;
            height: 100%;
            object-fit: cover;
        `
    },
    element: {
        fill: css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `
    }
}

const above = Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media screen and (min-width: ${breakpoints[label]}px) {
            ${css(...args)}
        }
    `
    return acc
}, {})

const below = Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media screen and (max-width: ${breakpoints[label]}px) {
            ${css(...args)}
        }
    `
    return acc
}, {})

const theme = {
    mobileVW,
    desktopVW,
    breakpoints,
    colors,
    fontFamilies,
    fontSizes,
    sizes,
    styles,
    above,
    below,

    underline: (color, height) => css`
        &:after {
            content: '';
            display: block;

            transform: scaleX(0);
            transform-origin: right;

            height: ${height}rem;

            margin-top: -0.1rem;
            
            background-color: ${color};
            
            transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
        }

        &:hover {
            &:after {
                transform: scaleX(1);
                transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
                transform-origin: left;
            }
        }
    `
}

export default theme