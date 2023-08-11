import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NaturalPerson } from '../domain/NaturalPerson';

@Injectable({
  providedIn: 'root'
})
export class NaturalPersonService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/natural-person'
  
  constructor(private http:HttpClient) { }

  getAllNaturalPersons(): Observable<NaturalPerson[]>{
    return this.http.get<NaturalPerson[]>(`${this.apiUrl}/all`)
  }
}
