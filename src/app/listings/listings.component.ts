import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { Listing } from '../listing';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings: Listing[];
  form = new FormGroup({
    bedCount: new FormControl(0),
    bathCount: new FormControl(0),
    roomType: new FormControl(''),
    propertyType: new FormControl(''),
    sortByValue: new FormControl('date'),
    sortByOrder: new FormControl('ascending'),
  });
  bedCount=0;
  bathCount=0;
  roomType="";
  propertyType="";
  page = 1;
  sortBy="date_descending";
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchListings();
  }
  get f(){
    return this.form.controls;
  }
  submit(){
    if(this.form.status === 'VALID'){
      console.log(this.form.value);
      this.sortBy="";
      if (this.form.value.sortByValue == "date"){
        this.sortBy+="date_"
      }else{
        this.sortBy+="price_"
      }
      if(this.form.value.sortByOrder == "ascending"){
        this.sortBy+="ascending";
      }else{
        this.sortBy+="descending"
      }
      this.apiService.fetchListings(
        1,
        this.form.value.bedCount,
        this.form.value.bathCount,
        this.form.value.roomType,
        this.form.value.propertyType,
        this.sortBy)
      .subscribe((listings)=>{
        this.bedCount=this.form.value.bedCount;
        this.bathCount=this.form.value.bathCount;
        this.roomType=this.form.value.roomType;
        this.propertyType=this.form.value.propertyType;
        this.listings=listings.data;
        this.page=listings.page;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page_num: this.page,
            bed_count: this.bedCount,
            bath_count: this.bathCount,
            room_type: this.roomType,
            property_type: this.propertyType,
            sort_by: this.sortBy
          },
          // preserve the existing query params in the route
        })
      })
    }
} 
fetchListings(){
  this.apiService.fetchListings(this.page,this.bedCount,
    this.bathCount,
    this.roomType,
    this.propertyType,
    this.sortBy)
    .subscribe((listings)=>{  
      this.listings = listings.data;  
      this.page = listings.page
    })  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page_num: this.page,
        bed_count: this.bedCount,
        bath_count: this.bathCount,
        room_type: this.roomType,
        property_type: this.propertyType,
        sort_by: this.sortBy

      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
    })
}

  next(){
    console.log(this.sortBy);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page_num: +this.page+1
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
    })
    this.apiService.fetchListings(+this.page+1,this.bedCount,
      this.bathCount,
      this.roomType,
      this.propertyType,
      this.sortBy)
    .subscribe((listings)=>{  
      this.listings = listings.data;  
      this.page = listings.page;
		})  
  }
  back(){
    console.log(this.sortBy);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page_num: +this.page-1
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
    })
    this.apiService.fetchListings(+this.page-1,this.bedCount,
        this.bathCount,
        this.roomType,
        this.propertyType,
        this.sortBy)
    .subscribe((listings)=>{  
      this.listings = listings.data;  
      this.page = listings.page;
		})  
  }
  pageIsNotAvailable(page){
    if (page-1 <=0){
      return true;
    }else{
      return false;
    }
  }

}
