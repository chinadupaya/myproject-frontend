import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from '../booking';
import { Review } from '../review';
@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  currentRate = 5;
  bookings: Booking[];
  userHasBookingBool=false;
  form: FormGroup;
  submitted=false;
  bookingId:number;
  @Input() listingId:number;
  @Input() reviews: Review[];
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    ) { }

  ngOnInit(): void {
    this.userHasBooking();
    this.form = this.formBuilder.group({
      ratingNum: [5, Validators.required],
      content: ["", Validators.required],
    });
  }
  userHasBooking(){
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.apiService.fetchUserListingBookings(userObj.id, this.listingId)
    .subscribe(bookings=>{
      console.log(bookings)
      this.bookings = bookings.data;
      if(this.bookings.length > 0 && this.findApprovedBooking(this.bookings)){
        this.userHasBookingBool = true
      }else{
        this.userHasBookingBool=false
      }
    });
  }
  findApprovedBooking(bookings){
    console.log("bookings", bookings);
    for (var i = 0; i< bookings.length; i++){
      console.log(bookings[i])
      if (bookings[i].is_approved == 1){
        this.bookingId = bookings[i].id
        return true;
      }
    }
    return false;
  }
  onSubmit(){
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value);
    this.apiService.createReview(userObj.id, userObj.first_name, userObj.last_name, this.listingId,this.form.value.ratingNum, this.form.value.content, this.bookingId)
    .subscribe((res)=>{
      console.log(res);
      this.reviews.push(res.data);
    });
  }

}
