import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Booking } from '../booking';
import { Listing } from '../listing';
@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  @Input() userId: number;
  bookings: Booking[];
  startDate:String[];
  endDate: String;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserBookings();
  }
  fetchUserBookings(){
    this.apiService.fetchUserBookings(this.userId)
    .subscribe((bookings)=> {
      this.bookings = bookings.data;
    });
  }

}
