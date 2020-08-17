import { Component, OnInit, Input } from '@angular/core';
import { Listing } from 'src/app/listing';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-listing-images',
  templateUrl: './listing-images.component.html',
  styleUrls: ['./listing-images.component.css']
})
export class ListingImagesComponent implements OnInit {
  @Input() listingId: string;
  images = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchImages();
  }
  fetchImages(){
    console.log("HAFSLDFHALJSDF",this.listingId);
    this.apiService.fetchListingImages(this.listingId)
    .subscribe((images)=>{
      
      this.images = Object.values(JSON.parse(JSON.stringify(images.data)));
      console.log(this.images)
    })
  }
  transform(fileName){
    return "http://localhost:3000/"+fileName.split('public/')[1];
  }

}
