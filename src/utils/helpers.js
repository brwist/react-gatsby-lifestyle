export const generatePath = (lang, slug) => {
    return `${lang.substring(0, 2)}/${slug ? `${slug}/` : ''}`
}

export const padLeft = number => number.toString().padStart(2, '0')

export const removeLeadingSlashes = string => string.replace(/^\/|\/$/g, '')

export const getOverlayColor = backgroundColor => {
    switch (backgroundColor) {
        case 'Grey': return theme.colors['light']
        case 'White': return theme.colors['white']
    }
}

export const isPreloaderActive = () => {
    return localStorage.getItem('preloaderActive')
}