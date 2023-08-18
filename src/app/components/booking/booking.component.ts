import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface Booking {
  id: any;
  from: string;
  to: string;
  date: Date;
  time: string;
  price: number;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  bookings!: any;
  orderByDateDesc: boolean = false;
  todayBookings: boolean[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private router: Router,
    private apiService: ApiService) { }


  ngOnInit(): void {
    this.booking();

  }

  getCurrentPageBookings(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.bookings.slice(startIndex, startIndex + this.itemsPerPage);
  }

  calculateTodayBookings(): void {
    this.todayBookings = this.bookings.map((booking: any) => this.isToday(booking.booking_date));
  }


  isToday(date: any): boolean {
    const today = new Date();
    return date === today.toDateString();
  }

  trackBooking(booking: Booking): void {
    // Replace 'track/:id' with your actual tracking route
    this.router.navigate(['track', booking.id]);
  }

  booking() {
    this.apiService.show_booking().subscribe(
      (data) => {
        this.bookings = data.booking;
        this.calculateTodayBookings(); // Call the method here
      },
      (error) => {
        console.log('Error Fetching Data: ', error);
        alert(error.message);
      }
    );
  }

  cancel_booking(data: any) {
    this.apiService.delete_booking(data.id).subscribe((data) => {
      console.log(data)
      alert(data.massage)
      this.booking()
    }, error => console.log(error));
  }


  shouldShowTrackButton(booking: any): boolean {
    const today = new Date().toDateString();
    const hasTodayBooking = this.bookings.some((b: any) => b.booking_date === today);
    return booking.booking_date === today || hasTodayBooking;
  }

  generateReceipt(booking: any): string {
    // Generate receipt content for the given booking
    const receiptContent = `
      Booking ID: ${booking.id}
      From: ${booking.Bus.from}
      To: ${booking.Bus.to}
      Date: ${booking.booking_date}
      Time: ${booking.booking_time}
      Price (LKR): ${booking.amount_paid}
      `;
    return receiptContent;
  }

  downloadReceipt(booking: any): void {
    const receiptContent = this.generateReceipt(booking);

    // Create a Blob with the receipt content and MIME type
    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a downloadable anchor element
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `receipt_${booking.id}.txt`; // Set the filename

    // Trigger the click event on the anchor element to start download
    anchor.click();

    // Clean up the created URL
    window.URL.revokeObjectURL(url);
  }




}
