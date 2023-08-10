import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../domain/Product'; 
import { Partner } from '../domain/Partner';
import { Firm } from '../domain/Firm';

@Injectable({
  providedIn: 'root'
})
export class FirmService {
    private readonly apiUrl = 'http://localhost:8080/api/v1/firm'

    constructor(private http:HttpClient){}

    getAllFirms():Observable<Firm[]>{
        return this.http.get<Firm[]>(`${this.apiUrl}/all`)
    }
}