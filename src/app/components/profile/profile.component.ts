import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  constructor(private apiService: ApiService,
    private tokenService: TokenService,

    private router: Router) { }

  name: any;
  phone_number: any;
  editPhoneNumber = false;
  newPhoneNumber: string = '';

  editPassword = false;
  oldPassword: string = '';
  newPassword: string = '';
  message!: string;
  err!: string;

  ngOnInit() {
    this.details();
  }

  details() {
    this.apiService.getUserDetails().subscribe(
      (data) => {
        this.name = data.user_data.name;
        this.phone_number = data.user_data.phone_number;
      },
      (error: any) => console.log(error)
    );
  }

  // savePhoneNumber() {
  //   // Call API to update phone number using this.newPhoneNumber
  //   // Reset editPhoneNumber to hide the input fields
  //   this.apiService.change_phone(this.newPhoneNumber).subscribe(
  //     (Response)=>{
  //       console.log(Response);
  //     },
  //     error=>{console.log(error)},
  //   )
  //   console.log(this.newPhoneNumber)
  //   this.editPhoneNumber = false;
  // }

  // password change
  changePassword() {
    const data = {
      old_pswd: this.oldPassword,
      new_pswd: this.newPassword
    };

    this.apiService.change_pswd(data).subscribe(
      response => {
        if (response.message === 'Password successfully updated') {
          this.editPassword = false;
          this.oldPassword = '';
          this.newPassword = '';
          this.message = 'Password updated successfully';
          this.err = '';
          setTimeout(() => {
            this.message = '';
          }, 5000);

        } else if (response.message === "Wrong password try agin") {
          this.message = '';
          this.err = 'Wrong password. Try again.';
          this.editPassword = true;

        }
      },
      error => {
        console.log('Error updating password:', error);
      }
    );

  }

  removeAccount() {
    this.apiService.deleteUser().subscribe((data) => {
      console.log(data);
      this.tokenService.clearTokens();
      this.router.navigate(['/auth']);

    }, (err) => { console.log(err); });
  }



}
