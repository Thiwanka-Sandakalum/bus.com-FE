import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl='http://localhost:3000';

  constructor(private http: HttpClient) { }

  // register user
  register(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, formData).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      })
    );
  }

  // login user
  login(data: any): Observable<{ access_token: string; refresh_token: string }> {
    return this.http.post<{ access_token: string; refresh_token: string }>(`${this.apiUrl}/user/login`, data)
      .pipe(
        catchError(error => {
          this.handleApiError(error);
          return throwError(error);
        })
      );
  }

  // get user details
  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/details`).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      }))
  }

  // delete user
  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user`).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      }))
  }

  // change phone number
  // change_phone(phone_number: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/user/phone`, {phone_number:phone_number}).pipe(
  //     catchError(error => {
  //       this.handleApiError(error);
  //       return throwError(error);
  //     })
  //   );
  // }

  // change password
  change_pswd(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/password`, data).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      })
    );
  }



  // seach buses
  searchResults(from: string, to: string, available_dates: string,date:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/search`, {
      from,
      to,
      available_dates,
      date
    }).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      })
    );
  }

  // make a booking
  booking(booking_date: string, bus_id: string, payment_method: string, amount_paid: string, booking_time: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/booking`, {
      booking_date, bus_id, payment_method, amount_paid, booking_time
    }).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      })
    )
  }

  // get bookings
  show_booking(): Observable<any> {
    return this.http.get(`${this.apiUrl}/booking`).pipe(catchError(error => { this.handleApiError(error); return throwError(error); }))
  }

  // delete booking
  delete_booking(id: any): Observable<any> {
    id = { booking_id: id }
    return this.http.delete(`${this.apiUrl}/booking`, { body: id }).pipe(catchError(error => { this.handleApiError(error); return throwError(error); }))
  }

  // logout 
  logOut(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/logout`).pipe(
      catchError(error => {
        this.handleApiError(error);
        return throwError(error);
      })
    );
  }

  private handleApiError(error: any): void {
    if (error?.error?.message) {
      console.log(error.message)
    } else {
      console.log("API Error")
    }
  }
}
