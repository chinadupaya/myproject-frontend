import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ListingEditComponent } from './listing-edit/listing-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'listings/:id', component: ListingDetailsComponent },
  { path: 'listings/:id/edit', component: ListingEditComponent },
  { path: 'home', component: LandingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit', component: UserEditComponent },
  { path: 'create-listing', component: CreateListingComponent },
  { path: 'users/:id', component: UserProfileComponent},
  { path: 'messages', component: MessagesComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [ CookieService ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
