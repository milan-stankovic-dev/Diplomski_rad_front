import { Partner } from "./Partner"
import { GoodsReceivedNoteItem } from "./GoodsReceivedNoteItem"

export interface GoodsReceivedNote{
    id : number
    deadLine : Date
    totalCost : number
    partner : Partner
    items : GoodsReceivedNoteItem
}