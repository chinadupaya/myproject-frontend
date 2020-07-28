import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  constructor(private apiService:ApiService,
    private cookieService: CookieService 
    ) { }

  ngOnInit(): void {
    this.fetchUser()
  }
  fetchUser(){
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.user = userObj;
  }

}
