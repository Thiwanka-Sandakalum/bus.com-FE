import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.tokenService.getAccessToken();

    if (accessToken) {
      // Check if the access_token is expired
      const decodedToken = this['jwtService'].decodeToken(accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        // Access token has expired, try to refresh it
        this.authService.refreshToken().subscribe(
          (newAccessToken: string) => {
            req = this.updateTokenInRequest(req, newAccessToken);
            return next.handle(req);
          },
          (error) => {
            // Refresh token failed or expired, handle as needed
            // For example, log out the user and redirect to login page
            this.authService.logout();
            return next.handle(req);
          }
        );
      } else {
        req = this.updateTokenInRequest(req, accessToken);
      }
    }

    return next.handle(req);
  }

  private updateTokenInRequest(
    req: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
