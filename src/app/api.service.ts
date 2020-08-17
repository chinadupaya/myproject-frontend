import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Listing } from './listing';
import { Review } from './review';
import { User } from './user';
import { Booking } from './booking';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  latitude; longitude;
  private SERVER_URL = "http://localhost:3000";
  constructor(private httpClient: HttpClient, private cookieService: CookieService ) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

// min_bed, min_bathroom, room_type, property_type, sort_by
//&min_bed=${min_bed}&min_bathroom=${min_bathroom}&room_type=${room_type}&property_type=${property_type}&sort_by=${sort_by}
  fetchListings(page_num, latitude,longitude,min_bed, min_bathroom, room_type, property_type, sort_by): Observable<Listing[]>{  
    return this.httpClient.get<Listing[]>(`${this.SERVER_URL}/listings/?page_num=${page_num}&latitude=${latitude}&longitude=${longitude}&min_bed=${min_bed}&min_bathroom=${min_bathroom}&room_type=${room_type}&property_type=${property_type}&sort_by=${sort_by}`)
    .pipe(
      tap(_ => console.log('fetched listings')),
      catchError(this.handleError<Listing[]>('getListings', []))
    );  
  }
  getLatLng(){
    var geoDataObj = JSON.parse(this.cookieService.get("geoData"))
    return geoDataObj;
    /* this.cookieService.get("geoData")
    return {
      latitude: this.latitude,
      longitude: this.longitude
    } */
  }
  setLatLng(lat, lng,address){
    console.log(lat,lng);
    var data = {
      latitude: lat,
      longitude: lng,
      address: address
    }
    this.cookieService.set("geoData",JSON.stringify(data))
    this.latitude = lat;
    this.longitude = lng;
  }
  fetchListing(id){
    return this.httpClient.get<Listing>(`${this.SERVER_URL}/listings/${id}`)
    .pipe(
      tap(_=> console.log('fetched listing id: ' + id)),
      catchError(this.handleError<Listing>('getListing'))
    )
  }  
  fetchUserListingBookings(userId, listingId){
    return this.httpClient.get<Booking[]>(`${this.SERVER_URL}/users/${userId}/listings/${listingId}/bookings`)
    .pipe(
      tap(_=> console.log('fetched bookings of user id: ' + userId + " under listing id: " + listingId)),
      catchError(this.handleError<Listing>('fetchUserListingBookings'))
    )
  }
  
  registerUser(formEmail, formFirstName, formLastName, formPassword){
    return this.httpClient.post(`${this.SERVER_URL}/users`,{
      email: formEmail,
      firstName: formFirstName,
      lastName: formLastName,
      password: formPassword
    }).pipe(
      tap(_=> console.log('registered User')),
      catchError(this.handleError<any>('registerUser',[]))
    )
  }
  editUser(email, firstName, lastName,userId){
    return this.httpClient.put(`${this.SERVER_URL}/users/${userId}`,{
      email, firstName, lastName
    }).pipe(
      tap(_=> console.log('edited User: ' + userId)),
      catchError(this.handleError<any>('edit User',[]))
    )
  }
  loginUser(formEmail, formPassword){
    return this.httpClient.post(`${this.SERVER_URL}/login`,{
      email: formEmail,
      password: formPassword
    }).pipe(
      tap(_=> console.log('login User')),
      catchError(this.handleError<any>('loginuser',[]))
    )
  }
  
  fetchReviews(listing_id){
    return this.httpClient.get<Review[]>(`${this.SERVER_URL}/listings/${listing_id}/reviews`)
    .pipe(
      tap(_=> console.log('fetched reviews listing_id: ' + listing_id)),
      catchError(this.handleError<Review[]>('getReviews', []))
    )
  }
  fetchUser(user_id){
    return this.httpClient.get<User>(`${this.SERVER_URL}/users/${user_id}`)
    .pipe(
      tap(_=> console.log('fetched bookings of user_id: ' + user_id)),
      catchError(this.handleError<Booking[]>('fetchUserBookings', []))
    )
  }
  fetchUserBookings(user_id){
    return this.httpClient.get<Booking[]>(`${this.SERVER_URL}/users/${user_id}/bookings`)
    .pipe(
      tap(_=> console.log('fetched bookings of user_id: ' + user_id)),
      catchError(this.handleError<Booking[]>('fetchUserBookings', []))
    )
  }
  fetchUserListings(user_id){
    return this.httpClient.get<Listing[]>(`${this.SERVER_URL}/users/${user_id}/listings`)
    .pipe(
      tap(_=> console.log('fetched listings of user_id: ' + user_id)),
      catchError(this.handleError<Listing[]>('fetchUserListings', []))
    )
  }
  fetchListingBookings(listing_id){
    return this.httpClient.get<Booking[]>(`${this.SERVER_URL}/listings/${listing_id}/bookings`)
    .pipe(
      tap(_=> console.log('fetched bookings of listing_id: ' + listing_id)),
      catchError(this.handleError<Listing[]>('fetchListingBookings', []))
    )
  }
  fetchListingImages(listing_id){
    console.log("fetchingimages");
    return this.httpClient.get<any>(`${this.SERVER_URL}/listings/${listing_id}/images`)
    .pipe(
      tap(_=> console.log('fetched images of listing_id: ' + listing_id)),
      catchError(this.handleError<any>('fetchListingImages', []))
    )
  }

  deleteBooking(booking_id){
    return this.httpClient.delete(`${this.SERVER_URL}/bookings/${booking_id}`)
  }
  deleteListing(listing_id){
    return this.httpClient.delete(`${this.SERVER_URL}/listings/${listing_id}`)
  }
  createBooking(startDate, endDate, isApproved, userId, listingId, listingName, listingAddress,pricePerDay, priceForStay){
    return this.httpClient.post(`${this.SERVER_URL}/bookings`,{
      startDate, endDate, isApproved, userId, listingId, listingName, listingAddress, pricePerDay, priceForStay
    }).pipe(
      tap(_=> console.log('created booking')),
      catchError(this.handleError<any>('createBooking',[]))
    )
  }
  createReview(userId, firstName, lastName, listingId, ratingNum, content, bookingId){
    return this.httpClient.post(`${this.SERVER_URL}/listings/${listingId}/reviews`,{
      userId, firstName, lastName, listingId, ratingNum, content, bookingId
    }).pipe(
      tap(_=> console.log('created review')),
      catchError(this.handleError<any>('createReview',[]))
    )
  }
  approveBooking(startDate, endDate, isApproved, userId, listingId, pricePerDay, priceForStay, bookingId){
    return this.httpClient.put(`${this.SERVER_URL}/bookings/${bookingId}`,{
      startDate, endDate, isApproved, userId, listingId, pricePerDay, priceForStay
    })
  }
  createListing(name, firstName, lastName, description, propertyType, roomType, address, latitude, longitude, bedCount, bathroomCount, maxGuest, priceByNight, userId){
    //console.log(name, description, propertyType, roomType, address, latitude, longitude, bedCount, bathroomCount, maxGuest, priceByNight, userId)
    return this.httpClient.post(`${this.SERVER_URL}/listings`,{
      name, firstName, lastName, description, propertyType, roomType, address, latitude, longitude, bedCount, bathroomCount, maxGuest, priceByNight, userId
    }).pipe(
      tap(_=> console.log('created listing')),
      catchError(this.handleError<any>('createListing',[]))
    ).subscribe(
      res => {
         console.log(res);
      }
    )
  }
  editListing(name, description, propertyType, roomType, address, latitude, longitude, bedCount, bathroomCount, maxGuest, priceByNight, userId, listingId){
    return this.httpClient.put(`${this.SERVER_URL}/listings/${listingId}`,{
      name, description, propertyType, roomType, address, latitude, longitude, bedCount, bathroomCount, maxGuest, priceByNight, userId
    }).pipe(
      tap(_=> console.log('edit listing: '+listingId )),
      catchError(this.handleError<any>('editListing',[]))
    ).subscribe(
      res => {
         console.log(res);
      }
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

