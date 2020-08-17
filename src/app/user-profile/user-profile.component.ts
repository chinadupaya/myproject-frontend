import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Listing } from '../listing';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userListings: Listing[];
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser(){
    const id = this.route.snapshot.paramMap.get('id')
    this.apiService.fetchUser(id)
    .subscribe((user)=>{
      this.user = user.data;
    })
    this.apiService.fetchUserListings(id)
    .subscribe((listings)=>{
      this.userListings = listings.data;
    })
  }

}
