import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.checkUser();
  }
  checkUser(){
    if(this.cookieService.check('Test')){
      return true;
    }else{
      return false;
    }
  }
  logoutUser(){
    this.cookieService.delete('Test');
    this.router.navigate(['../login'], { relativeTo: this.route })
  }

}
