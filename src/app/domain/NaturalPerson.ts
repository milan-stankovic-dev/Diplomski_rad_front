import { Buyer } from "./abstraction/Buyer"

export interface NaturalPerson extends Buyer {
    id : number
    name : string
    lastName : string
}