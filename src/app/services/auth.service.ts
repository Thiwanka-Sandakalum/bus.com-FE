import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, tap, catchError, throwError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshUrl = 'http://localhost:3000/user/token'; // Replace with the backend refresh endpoint

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    // Check if the access token exists in the local storage
    return !!this.tokenService.getAccessToken();
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (refreshToken) {
      return this.http.post<any>(this.refreshUrl, { refresh_token: refreshToken }).pipe(
        tap((res) => {
          this.tokenService.setAccessToken(res.access_token);
        }),
        catchError((error) => {
          console.error('Token refresh failed:', error);
          // Return an observable with the error, so the interceptor can handle it
          return throwError(error);
        })
      );
    } else {
      // Handle the case where refresh token is missing or expired
      // For example, you might want to log the user out and redirect to the login page
      this.logout();
      // Return an empty observable, so the interceptor can proceed with the original request
      return EMPTY;
    }
  }

  logout(): void {
    this.tokenService.clearTokens();
    // Additional logout logic (e.g., redirect to login page)
    
    this.router.navigate(['auth']);
  }
}
