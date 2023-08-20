import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  selectedFrom: string = '';
  selectedTo: string = '';
  selectedDate: string = '';
  tableData!: any;

  currentDate: string = new Date().toISOString().split('T')[0]; // Get current date in ISO format


  constructor(private apiService: ApiService) { }

  search(): void {
    this.apiService.searchResults(this.selectedFrom, this.selectedTo, this.calculateDayOfWeek())
      .subscribe((data) => {
        this.tableData = data;
      },
        (error) => {
          console.log('Error Fetching Data: ', error);
        });
  }

  cities: string[] = ['Ampara', 'Ambalangoda', 'Batticaloa', 'Battaramulla', 'Battaramulla', 'Dambulla', 'Dickwella', 'Galle', 'Gampaha', 'Gampaha',
    'Galle', 'Habarana', 'Hanthana', 'Hikkaduwa', 'Homagama', 'Jaffna', 'Kandy', 'Katugastota', 'Kegalle', 'Kilinochchi',
    'Koggala', 'Kollupitiya', 'Kurunegala', 'Mahanthegama', 'Maharagama', 'Mannar', 'Maradana', 'Matale', 'Matara', 'Matara',
    'Mirissa', 'Mullaitivu', 'Nugegoda', 'Pettah', 'Polonnaruwa', 'Rajagiriya', 'Sigiriya', 'Tangalle', 'Trincomalee', 'Vavuniya', 'Weligama'
  ];


  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  calculateDayOfWeek(): string {
    if (!this.selectedDate) {
      return ''; // Return an empty string if no date is selected
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateObject = new Date(this.selectedDate);
    const dayOfWeekIndex = dateObject.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }


}
