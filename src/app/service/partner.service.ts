import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../domain/Product'; 
import { Partner } from '../domain/Partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
    private readonly apiUrl = 'http://localhost:8080/api/v1/partner'

    constructor(private http:HttpClient){}

    getAllPartners():Observable<Partner[]>{
        return this.http.get<Partner[]>(`${this.apiUrl}/all`)
    }
}