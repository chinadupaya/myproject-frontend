import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  model: NgbDateStruct;
  onSubmit(f:NgForm){
    console.log(f.value);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
