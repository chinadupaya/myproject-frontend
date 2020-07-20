import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted=true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading=true;
  }

}
