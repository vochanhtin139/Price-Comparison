export default interface IProduct {
    // id: string
    productLinkId: string
    fromCategory?: string | null
    shopLink: string
    productLink: string
    productName: string
    productPrice: string
    productImageLink: string
    productRating: string
    crawlTime: string
    ecommerceSite?: string
    type?: 'shopLink' | 'categoryLink'
}
