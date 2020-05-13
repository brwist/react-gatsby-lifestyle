export const generatePath = (lang, slug) => {
    return `${lang.substring(0, 2)}/${slug ? `${slug}/` : ''}`
}
export const padLeft = (number) => number.toString().padStart(2, '0')