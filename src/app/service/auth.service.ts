import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthRequest } from '../userUtils/auth-request';
import { AuthResponse } from '../userUtils/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = 'http://localhost:8080/api/v1';
  private loggedInStatusSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public get loggedInStatus(): Observable<boolean> {
    return this.loggedInStatusSubject$.asObservable();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const authRequest: AuthRequest = { username, password };

    return this.http.post<AuthResponse>(`${this.url}/user/login`, authRequest).pipe(
      tap((response: AuthResponse) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.loggedInStatusSubject$.next(true);
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
