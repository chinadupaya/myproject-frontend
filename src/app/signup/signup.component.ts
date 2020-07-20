import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,) { }

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
  }
}
