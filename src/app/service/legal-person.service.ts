import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LegalPerson } from '../domain/LegalPerson';

@Injectable({
  providedIn: 'root'
})
export class LegalPersonService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/legal-person'
  
  constructor(private http:HttpClient) { }

  getAllLegalPersons(): Observable<LegalPerson[]>{
    return this.http.get<LegalPerson[]>(`${this.apiUrl}/all`)
  }
}
