import { Product } from "./Product"

export interface ReportItem{
    id : number
    productCapacity : number
    product : Product
    totalAvailableCapacity : number
}