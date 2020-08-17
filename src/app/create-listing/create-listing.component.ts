import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  address;
  latitude;
  longitude;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priceByNight: ['', Validators.required],
      address: ['', Validators.required],
      bedCount: [1, Validators.required],
      bathCount: [1, Validators.required],
      guestCount: [1, Validators.required],
      roomType: ['shared', Validators.required],
      propertyType: ['house', Validators.required],
    });
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
    console.log(this.address, this.latitude, this.longitude);
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.apiService.createListing(f.name, userObj.first_name, userObj.last_name,f.description, f.propertyType, f.roomType, this.address, this.latitude, this.longitude, f.bedCount, 
      f.bathCount, f.guestCount, f.priceByNight, userObj.id);
    this.router.navigate(['../profile'], { relativeTo: this.route })
  }

}
