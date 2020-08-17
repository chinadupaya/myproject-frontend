import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../user';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:User;
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.fetchUser()
  }
  get f() { return this.form.controls; }

  fetchUser(){
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.user = userObj;
    this.form = this.formBuilder.group({
      firstName: [userObj.first_name, Validators.required],
      lastName: [userObj.last_name, Validators.required],
      email: [userObj.email, Validators.required],
    });
  }
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value);
    this.loading=true;
    this.apiService.editUser(this.form.value.email, this.form.value.firstName, this.form.value.lastName, this.user.id)
      .pipe(first())
      .subscribe(
        data => {
          //console.log(data);
          var userObj={
            id: this.user.id,
            first_name: this.form.value.firstName,
            last_name: this.form.value.lastName,
            email: this.form.value.email
          }
          this.cookieService.delete('Test');
          this.cookieService.set('Test', JSON.stringify(userObj));
          this.router.navigate(['../'], { relativeTo: this.route })
            //this.router.navigate(['../'], { relativeTo: this.route });
        },
        error => {
          alert("Edit user failed");
            this.loading = false;
        });
  }

}
