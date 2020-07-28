import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Listing } from '../listing';
import { Review } from '../review';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
  providers: [ DatePipe ]
})
export class ListingDetailsComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  listing: Listing;
  reviews: Review[];
  form: FormGroup;
  totalPrice=0;
  roomDescription="";
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private cookieService: CookieService ) { }

  ngOnInit(): void {
    this.fetchListing();
    this.form = this.formBuilder.group({
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
    this.onChanges();
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      const oneDay = 24 * 60 * 60 * 1000;
      var startDateObj = Object.assign({},val.startDate);
      
      var endDateObj = Object.assign({},val.endDate);;
      var dStart = new Date(startDateObj.year,startDateObj.month-1,startDateObj.day);
      var dEnd = new Date(endDateObj.year,endDateObj.month-1,endDateObj.day);
      var duration = dEnd.valueOf() - dStart.valueOf();
      this.totalPrice = Math.round(duration / oneDay) * this.listing.price_by_night;
      //calculateTotalPrice(startDateObj);
      
      /* 
      var dStart = new Date(startDateObj.year,startDateObj.month-1,startDateObj.day);
      var dEnd = new Date(endDateObj.year,endDateObj.month-1,endDateObj.day);
      var duration = dEnd.valueOf() - dStart.valueOf();
      this.totalPrice = Math.round(duration / oneDay) * this.listing.price_by_night;
      console.log("Duration: "+duration); */
    });

  }
  fetchListing(){
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.fetchListing(id)
    .subscribe(listing=> {
      this.listing=listing.data;
      this.apiService.fetchReviews(this.listing.id).subscribe(reviews=>{
        this.reviews = reviews.data;
      });
      if(this.listing.room_type.localeCompare("shared")==0){
        this.roomDescription="You share this room with others"
      }
      else if(this.listing.room_type.localeCompare("private")==0){
        this.roomDescription="You have the room to yourself but may need to share other facilities"
      }
      else if(this.listing.room_type.localeCompare("entire")==0){
        this.roomDescription="You have the room and facilities all to yourself"
      }
    })
  }
  goBack(): void {
    this.location.back();
  }
  convertDate(date){
    return date.toLocaleString();
  }
  onSubmit(){
    var startDateObj = this.form.value.startDate;
    var endDateObj = this.form.value.endDate;
    var dStart = new Date(startDateObj.year,startDateObj.month-1,startDateObj.day);
    var dEnd = new Date(endDateObj.year,endDateObj.month-1,endDateObj.day);
    var dStartString = dStart.toISOString().substring(0, 10);
    var dEndString = dEnd.toISOString().substring(0, 10);
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.apiService.createBooking(dStartString, dEndString, 0, userObj.id, this.listing.id, this.listing.price_by_night, this.totalPrice)
  }
}
