import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { Listing } from '../listing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-listings-upload',
  templateUrl: './user-listings-upload.component.html',
  styleUrls: ['./user-listings-upload.component.css']
})

export class UserListingsUploadComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  @Input() listing: Listing;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      listingImages: ['']
    });
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('listingImages').setValue(file);
  }


  onFormSubmit() {

    if (!this.fileUploadForm.get('listingImages').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('listingImages', this.fileUploadForm.get('listingImages').value)
    formData.append('listingId',`${this.listing.id}`);
    formData.append('uploadedBy',`${this.listing.user_id}`);
    //formData.append('agentId', '007');
    console.log(this.fileUploadForm);


    this.http
      .post<any>(`http://localhost:3000/listings/${this.listing.id}/images`, formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }

}
