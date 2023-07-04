import { Buyer } from "./abstraction/Buyer"
import { BillOfLadingItem } from "./BillOfLadingItem"

export interface BillOfLading {
    id : number
    deadLine : Date
    issueDate : Date
    totalCost : number
    buyer : Buyer
    items : BillOfLadingItem[]
}