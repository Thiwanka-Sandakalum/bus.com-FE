import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.routeConfig?.path === 'auth' && this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
      return false;
    }

    if (route.routeConfig?.path !== 'auth' && !this.authService.isLoggedIn()) {
      this.router.navigate(['auth']);
      return false;
    }

    return true;
  }
}


