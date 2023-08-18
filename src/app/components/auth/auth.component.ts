import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginForm: boolean = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  message!: string;
  error_msg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phone_number: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', Validators.required],
      role: ['customer', Validators.required]
    });
  }

  toggleMode(): void {
    this.isLoginForm = !this.isLoginForm;
  }

  login(): void {
    const data = {
      phone_number: this.loginForm.get('phone_number')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.apiService.login(data).subscribe(
      (res: { access_token: any; refresh_token: any }) => {
        const { access_token, refresh_token } = res;
        
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        this.router.navigate(['search']);
      },
      (error: any) => {
        if (error.error.message) {
          this.error_msg = error.error.message;
          setTimeout(() => {
            this.error_msg=''
          }, 5000);
        }
        else {
          console.error('Login failed:', error);
        }
      }
    );
  }

  register(): void {
    const formData = {
      name: this.registerForm.get('name')?.value,
      phone_number: this.registerForm.get('phone_number')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value
    };

    this.apiService.register(formData).subscribe(
      () => {
        this.message = 'Registration successful!';
        this.isLoginForm = true;
      },
      (error) => {
        console.error('Registration failed:', error);
        this.message = 'Registration failed. Please try again.';
      }
    );
  }
}
