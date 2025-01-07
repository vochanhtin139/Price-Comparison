export default interface IXPath {
    id: string
    field: string
    shopee: string | null
    tiki: string | null
    lazada: string | null
    specific_shopee: string | null
    specific_tiki: string | null
    specific_lazada: string | null
}

export interface ICrawlField {
    id: string
    field: string
    type: string
}
