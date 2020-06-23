export const generatePath = (lang, slug) => {
    return `${lang.substring(0, 2)}/${slug ? `${slug}/` : ''}`
}

export const padLeft = (number) => number.toString().padStart(2, '0')

export const scrollPosition = () => {
    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

    const x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    const y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

    return { x, y };
}

export const lerp = (current, target, multiplier) => {
    return (1 - multiplier) * current + multiplier * target;
}

export const getOverlayColor = backgroundColor => {
    switch (backgroundColor) {
        case 'Grey': return theme.colors['light']
        case 'White': return theme.colors['white']
    }
}