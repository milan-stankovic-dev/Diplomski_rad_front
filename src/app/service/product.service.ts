import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../domain/Product'; 
import { ProductSave } from '../domain/ProductSave';

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

  insertProduct(product: ProductSave):Observable<ProductSave>{
    return this.http.post<ProductSave>(`${this.apiUrl}`, product)
  }

  deleteProduct(id: number | null):Observable<any>{
    return this.http.delete<Product>(`${this.apiUrl}/${id}`)
  }

  updateProduct(product: Product | null) {
    console.log("CALLED ON UPDATE PRODUCT IN SERVICE:");
    console.log("URL", `${this.apiUrl}/update/${product?.id}`)
    return this.http.put<Product>(`${this.apiUrl}/update/${product?.id}`, product)
  }
}
