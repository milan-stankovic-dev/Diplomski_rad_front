import { ReportItem } from "./ReportItem"

export interface Report{
    id : number
    reportDate : Date
    totalCapacity : number
    reportitems : ReportItem[]
}