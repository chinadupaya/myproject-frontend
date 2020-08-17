import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  form: FormGroup;
  address;
  latitude;
  longitude;
  images = ["https://i.pinimg.com/originals/ec/94/a0/ec94a08704d1fbe418c1c1147bbddcac.jpg",
            "https://wallpaperaccess.com/full/1142283.jpg",
            "https://c4.wallpaperflare.com/wallpaper/76/280/48/architecture-building-design-house-wallpaper-preview.jpg"]
  
  constructor(private formBuilder: FormBuilder, 
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: ['', Validators.required],
    });
  }
  onSubmit(){
    console.log(this.address, this.latitude, this.longitude);
    this.apiService.setLatLng(this.latitude, this.longitude, this.address);    
    this.router.navigate(['../listings'], { relativeTo: this.route })
  }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  public handleAddressChange(address) {
    this.address=address.formatted_address;
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
}

}
