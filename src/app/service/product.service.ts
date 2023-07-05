import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../domain/Product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/product'

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/all`)
  }

  getAllProductsNamed(name : string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/all/named/${name}`)
  }

  insertProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}`, product)
  }
}
