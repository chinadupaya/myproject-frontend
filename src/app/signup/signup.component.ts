import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.loading=true;
    this.apiService.registerUser(this.form.value.email, this.form.value.firstName, this.form.value.lastName, this.form.value.password)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
            this.loading = false;
        });

  }
}
