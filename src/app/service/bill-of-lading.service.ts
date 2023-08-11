import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BillOfLading } from "../domain/BillOfLading"
import { Observable } from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class BillOfLadingService {
  private readonly apiUrl = "http://localhost:8080/api/v1/bill-of-lading"

  constructor(private http:HttpClient){}

  insertBill(bill:BillOfLading):Observable<BillOfLading>{
    return this.http.post<BillOfLading>(`${this.apiUrl}`, bill)
  }
}
