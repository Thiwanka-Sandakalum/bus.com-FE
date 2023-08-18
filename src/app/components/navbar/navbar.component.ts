import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMobileMenuOpen = false;
  currentPage = '/dashboard'; // Set default route
  mobileMenuItems: MenuItem[];
  desktopMenuItems: MenuItem[];

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.mobileMenuItems = [
      { label: 'Find Bus', route: '/search' },
      { label: 'Your Bookings', route: '/booking' },
      { label: 'Track Bus', route: '/coming-soon' },
      { label: 'Profile', route: '/profile' }
      // Add mobile-specific menu items here
    ];
    this.desktopMenuItems = [
      ...this.mobileMenuItems
      // Add desktop-specific menu items here
    ];
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  setCurrentPage(route: string) {
    this.currentPage = route;
    this.isMobileMenuOpen = false; // Close mobile menu after selecting a route
  }

  SignOut() {
    this.apiService.logOut().subscribe(
      (data) => {
        console.log(data);
        this.tokenService.clearTokens();
        this.router.navigate(['/auth']);
      },
      error => { console.log(error); }
    );
  }
}
