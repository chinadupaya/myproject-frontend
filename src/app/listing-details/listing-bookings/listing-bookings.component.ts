import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Booking } from 'src/app/booking';

@Component({
  selector: 'app-listing-bookings',
  templateUrl: './listing-bookings.component.html',
  styleUrls: ['./listing-bookings.component.css']
})
export class ListingBookingsComponent implements OnInit {
  @Input() listingId:string;
  bookings: Booking[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchListingBookings();
  }
  fetchListingBookings(){
    this.apiService.fetchListingBookings(this.listingId)
    .subscribe((bookings)=>{
      console.log("bookings", bookings);
      this.bookings = bookings.data})
  }
  approveBooking(booking){
    var dStartString = booking.start_date.split('T');
    var dEndString = booking.end_date.split('T');
    console.log(dStartString[0],dEndString[0]);
    this.apiService.approveBooking(dStartString[0], dEndString[0],1, booking.user_id, booking.listing_id, booking.price_per_day,
      booking.price_for_stay, booking.id).subscribe((res)=>{console.log(res);booking.is_approved=1});

  }
  declineBooking(booking){
    var dStartString = booking.start_date.split('T');
    var dEndString = booking.end_date.split('T');
    console.log(dStartString[0],dEndString[0]);
    this.apiService.approveBooking(dStartString[0], dEndString[0],2, booking.user_id, booking.listing_id, booking.price_per_day,
      booking.price_for_stay, booking.id).subscribe((res)=>{console.log(res); booking.is_approved=2});
  }

}
