import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../domain/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl ='http://localhost:8080/api/v1/report'

  constructor(private http:HttpClient) { }
  
  insertReport(report:Report):Observable<Report>{
    alert("Attempting to save report")
    console.log(JSON.stringify(report))
    return this.http.post<Report>(`${this.apiUrl}`,report)
  }
}