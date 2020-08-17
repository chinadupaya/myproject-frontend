import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Listing } from '../listing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css']
})
export class UserListingsComponent implements OnInit {

  @Input() userId: number;
  form: FormGroup;
  listings: Listing[];
  filesToUpload: Array<File>;
  constructor(private apiService: ApiService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchUserListings();
    this.form = this.formBuilder.group({
      filesToUpload: [[], Validators.required]
    });
  }
  fetchUserListings(){
    this.apiService.fetchUserListings(this.userId)
    .subscribe((listing)=>{
      console.log("listings",listing.data)
      this.listings = listing.data
    });
  }
  deleteListing(listing_id){
    //alert("DELETE");
    console.log(listing_id)
    this.apiService.deleteListing(listing_id)
    .subscribe(()=>this.fetchUserListings());
  }
  onSubmit(){
    //var userObj = JSON.parse(this.cookieService.get('Test'));
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value);
    
  }
}
