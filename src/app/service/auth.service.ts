import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url : string = 'http://localhost:8080/api/v1'

  constructor(private http: HttpClient) {

  }

  user$ = this.http.get<any>(`${this.url}/user/login`)
  .pipe(
    tap(console.log),
    catchError(this.handleException)
  )



  handleException(handleError : any) : Observable<never>{
    return throwError("Error exists");
  }
}
