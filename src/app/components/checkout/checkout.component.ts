import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private apiService: ApiService) { }

  @Input() open = false;

  @Input() data: any

  @Input() date: any

  @Output() close = new EventEmitter<void>();

  slip!: any;
  selectedPaymentMethod: string = 'Cash';
  massage!: string;
  showSuccessAlert = false;

  closePopup() {
    this.open = false;
  }

  closeSuccessAlert() {
    this.showSuccessAlert = false;
  }

  // post request to the server for the make a booking
  booking(
    booking_date = this.date,
    booking_time = this.data.available_times,
    bus_id = this.data.id,
    amount_paid = this.data.fees,
    payment_method = this.selectedPaymentMethod) {

    this.apiService.booking(booking_date, bus_id, payment_method, amount_paid, booking_time).
      subscribe((res) => {
        this.massage = res.massage
        this.open = false;
        this.showSuccessAlert = true;
        // this.slip = data.booking;
      }, (error) => {
        console.log('Error Fetching Data: ', error);
        alert(error.message);
      })
  }

}
