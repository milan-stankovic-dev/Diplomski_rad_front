import { ReportItem } from "./ReportItem"

export interface Report{
    id : number
    reportDate : Date
    totalCapacity : number
    reportItems : ReportItem[]
}