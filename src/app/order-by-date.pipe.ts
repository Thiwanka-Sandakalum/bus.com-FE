import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})

export class OrderByDatePipe implements PipeTransform {

  transform(bookings: any[], descending: boolean): any[] {
    return bookings.sort((a, b) => {
      const dateA = new Date(a.booking_date).getTime();
      const dateB = new Date(b.booking_date).getTime();
      if (descending) {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }
}
