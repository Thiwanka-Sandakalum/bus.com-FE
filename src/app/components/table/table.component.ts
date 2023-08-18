import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input()
  inputData: { data: any[], date:any } = { data: [], date: null };


  bookingPopupOpen = false;
  selectedItem: any = null;

  openBookingPopup(item: any) {
    this.selectedItem = item;
  }

  closeBookingPopup() {
    this.selectedItem = null;
  }

}
