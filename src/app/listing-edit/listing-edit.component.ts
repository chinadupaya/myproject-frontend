import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Listing } from '../listing';

@Component({
  selector: 'app-listing-edit',
  templateUrl: './listing-edit.component.html',
  styleUrls: ['./listing-edit.component.css']
})
export class ListingEditComponent implements OnInit {
  listing: Listing;
  form: FormGroup;
  submitted = false;
  address;
  latitude;
  longitude;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchListing()
  }
  fetchListing(){
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.fetchListing(id)
    .subscribe(listing=> {
      this.listing=listing.data;
      this.form = this.formBuilder.group({
        name: [this.listing.name, Validators.required],
        description: [this.listing.description, Validators.required],
        priceByNight: [this.listing.price_by_night, Validators.required],
        address: [this.listing.address, Validators.required],
        bedCount: [this.listing.bed_count, Validators.required],
        bathCount: [this.listing.bathroom_count, Validators.required],
        guestCount: [this.listing.max_guest, Validators.required],
        roomType: [this.listing.room_type, Validators.required],
        propertyType: [this.listing.property_type, Validators.required],
      });
      this.address = this.listing.address;
      this.latitude = this.listing.latitude;
      this.longitude = this.listing.longitude;

    })
  }
  get f() { return this.form.controls; }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
        public handleAddressChange(address) {
          this.address=address.formatted_address;
          this.latitude = address.geometry.location.lat();
          this.longitude = address.geometry.location.lng();
    }
  onSubmit(){
    this.submitted = true;
    var f = this.form.value;
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value);
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.apiService.editListing(f.name, f.description, f.propertyType, f.roomType, this.address, this.latitude, this.longitude, f.bedCount, 
      f.bathCount, f.guestCount, f.priceByNight, userObj.id, this.listing.id);
    this.router.navigate(['../../../profile'], { relativeTo: this.route })
  }

}
