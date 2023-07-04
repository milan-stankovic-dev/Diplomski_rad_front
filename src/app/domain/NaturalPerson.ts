import { Buyer } from "./abstraction/Buyer"

export interface NaturalPerson extends Buyer {
    id : number
    buyerName : string
    buyerLastName : string
}