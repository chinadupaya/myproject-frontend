import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/booking';
import { Listing } from 'src/app/listing';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-booking-details',
  templateUrl: './user-booking-details.component.html',
  styleUrls: ['./user-booking-details.component.css']
})
export class UserBookingDetailsComponent implements OnInit {
  @Input() booking:Booking;
  dateStart;
  dateEnd;
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dateStart = this.booking.start_date.toString().split('T');
    this.dateEnd= this.booking.end_date.toString().split('T');
  }
  deleteBooking(booking){
    this.apiService.deleteBooking(booking.id).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    });
  }


}
