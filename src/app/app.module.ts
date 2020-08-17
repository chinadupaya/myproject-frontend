import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingsComponent } from './listings/listings.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { UserBookingDetailsComponent } from './user-bookings/user-booking-details/user-booking-details.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { UserListingsComponent } from './user-listings/user-listings.component';
import { ListingBookingsComponent } from './listing-details/listing-bookings/listing-bookings.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { ListingEditComponent } from './listing-edit/listing-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component';

// ...other imports
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { UserListingsUploadComponent } from './user-listings-upload/user-listings-upload.component';
import { ListingImagesComponent } from './listing-details/listing-images/listing-images.component';
import { UrlTransformPipe } from './url-transform.pipe';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ListingsComponent,
    ListingDetailsComponent,
    ProfileComponent,
    UserBookingsComponent,
    UserBookingDetailsComponent,
    CreateListingComponent,
    UserListingsComponent,
    ListingBookingsComponent,
    UserEditComponent,
    ReviewCreateComponent,
    ListingEditComponent,
    UserProfileComponent,
    MessagesComponent,
    ChatListComponent,
    ChatComponent,
    UserListingsUploadComponent,
    ListingImagesComponent,
    UrlTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    GooglePlaceModule,
    GoogleMapsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
