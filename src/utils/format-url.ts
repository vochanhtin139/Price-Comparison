export const cleanedLink = (url: string): string => {
    try {
        const parsedUrl = new URL(url)
        // Chỉ lấy phần gốc của đường dẫn (origin + pathname)
        return `${parsedUrl.origin}${parsedUrl.pathname}`
    } catch (error) {
        console.error('Invalid URL:', url)
        throw new Error('Invalid URL')
    }
}

// export const convertStringToArray = (str: string): string[] => {
//     if (!str || str === 'Image not available') {
//         // return []
//         return ['/assets/images/product/image_not_available.jpg']
//     }
//     if (!str.startsWith('[') && !str.endsWith(']')) return [str]
//     return str
//         .replace(/[\\[\]']+/g, '')
//         .split(',')
//         .map((item) => item.trim())
// }

export const convertStringToArray = (str: any): string[] => {
    if (Array.isArray(str)) return str

    if (typeof str !== 'string' || str === 'Image not available') {
        return ['/assets/images/product/image_not_available.jpg']
    }

    // If it's a plain string without brackets
    if (!str.startsWith('[') && !str.endsWith(']')) return [str]

    return str
        .replace(/[\\[\]']+/g, '')
        .split(',')
        .map((item) => item.trim())
}
