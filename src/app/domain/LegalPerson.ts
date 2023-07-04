import { Buyer } from "./abstraction/Buyer"

export interface LegalPerson extends Buyer {
    id : number
    firmName : string
}