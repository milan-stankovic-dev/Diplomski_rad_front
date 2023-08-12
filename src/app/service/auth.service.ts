import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthRequest } from '../userUtils/auth-request';
import { AuthResponse } from '../userUtils/auth-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = 'http://localhost:8080/api/v1';
  private loggedInStatusSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // constructor(private http: HttpClient, private router: Router) {}
  constructor(private http: HttpClient, private router: Router) {
    // Get the initial authentication status from local storage
    const initialLoggedInStatus = this.isAuthenticated();
    this.loggedInStatusSubject$ = new BehaviorSubject<boolean>(initialLoggedInStatus);
  }

  public get loggedInStatus(): Observable<boolean> {
    return this.loggedInStatusSubject$.asObservable();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const authRequest: AuthRequest = { username, password };
    return this.http.post<AuthResponse>(`${this.url}/user/login`, authRequest).pipe(
      tap((response: AuthResponse) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.loggedInStatusSubject$.next(true); // Emit true for logged in
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInStatusSubject$.next(false); // Emit false for logged out
    this.router.navigate(['/home']);
  }

  getToken():string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log("no token found")
      return false; // No token found
    }

    const tokenData = this.decodeToken(token);
    if (!tokenData || !tokenData.exp) {
      console.log("Invalid token format or missing expiration time")
      return false; // Invalid token format or missing expiration time
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return tokenData.exp > currentTime;
  }

  private decodeToken(token: string): any {
    try {
      // Decode JWT token
      const tokenPayload = token.split('.')[1];
      const base64 = tokenPayload.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      return null; // Invalid token format or decoding error
    }
  }
}
  
