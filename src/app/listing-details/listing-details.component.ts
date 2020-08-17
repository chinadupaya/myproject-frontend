import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Listing } from '../listing';
import { Review } from '../review';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
  providers: [ DatePipe ]
})
export class ListingDetailsComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  center;
  marker;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  listing: Listing;
  reviews: Review[];
  form: FormGroup;
  totalPrice=0;
  roomDescription="";
  isOwnedByUser=false;
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private cookieService: CookieService,
    private webSocketService: WebSocketService ) { }

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
    });


  }
  get f() { return this.form.controls; }
  fetchListing(){
    var userObj;
    if(this.cookieService.check('Test')){
      userObj = JSON.parse(this.cookieService.get('Test'));
    }
    
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.fetchListing(id)
    .subscribe(listing=> {
      this.listing=listing.data;
      console.log(listing.data)
      this.center={
        lat: parseFloat(this.listing.latitude),
        lng: parseFloat(this.listing.longitude)
      }
      this.marker={
        position: {
          lat: parseFloat(this.listing.latitude),
          lng: parseFloat(this.listing.longitude)
        },
        label: {
          color: 'red',
          text: this.listing.address,
        },
        title: this.listing.name,
        options: { animation: google.maps.Animation.BOUNCE },
      }
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
      
      if(userObj.id == this.listing.user_id){
        console.log("listing owned by user");
        this.isOwnedByUser=true;
      }else{
        console.log("not owned by user")
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
    console.log("cookie", userObj);
    this.apiService.createBooking(dStartString, dEndString, 0, userObj.id, this.listing.id, this.listing.name, this.listing.address, this.listing.price_by_night, this.totalPrice)
    .subscribe(()=>{
      this.router.navigate(['../../profile'], { relativeTo: this.route })
    })
  }
  createRoom(){
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.webSocketService.createRoom(this.listing.user_id, userObj.id, `${this.listing.first_name} ${this.listing.last_name}`, `${userObj.first_name} ${userObj.last_name}`);
    this.router.navigate(['../../messages', { relativeTo: this.route }])
  }
}
