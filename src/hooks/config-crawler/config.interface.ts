export default interface IXPath {
    id: string
    field: string
    shopee: string | null
    tiki: string | null
    lazada: string | null
    specificShopee: string | null
    specificTiki: string | null
    specificLazada: string | null
}

export interface ICrawlField {
    id: string
    field: string
    type: string
}
