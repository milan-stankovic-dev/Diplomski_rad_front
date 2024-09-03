
export interface ProductSave{
    id : number
    productName : string
    weight : number
    fragile : boolean
    currentStock : number
    minimalStock: number
    orderAmount: number
    type : string
    price : number
    supplierId: number
    code: string
}