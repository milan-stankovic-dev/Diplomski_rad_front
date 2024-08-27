import { Partner } from "./Partner"

export interface Product{
    id : number
    productName : string
    weight : number
    fragile : boolean
    currentStock : number
    minimalStock: number
    orderAmount: number
    type : string
    price : number
    supplier: Partner
}