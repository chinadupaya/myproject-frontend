import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Listing } from './listing';
import { Review } from './review';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000";
  constructor(private httpClient: HttpClient, private cookieService: CookieService ) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

// min_bed, min_bathroom, room_type, property_type, sort_by
//&min_bed=${min_bed}&min_bathroom=${min_bathroom}&room_type=${room_type}&property_type=${property_type}&sort_by=${sort_by}
  fetchListings(page_num,min_bed, min_bathroom, room_type, property_type, sort_by): Observable<Listing[]>{  
    return this.httpClient.get<Listing[]>(`${this.SERVER_URL}/listings/?page_num=${page_num}&min_bed=${min_bed}&min_bathroom=${min_bathroom}&room_type=${room_type}&property_type=${property_type}&sort_by=${sort_by}`)
    .pipe(
      tap(_ => console.log('fetched listings')),
      catchError(this.handleError<Listing[]>('getListings', []))
    );  
  }
  fetchListing(id){
    return this.httpClient.get<Listing>(`${this.SERVER_URL}/listings/${id}`)
    .pipe(
      tap(_=> console.log('fetched listing id: ' + id)),
      catchError(this.handleError<Listing>('getListing'))
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

  /* fetchUser(userId){
    return this.httpClient.get<User>(`${this.SERVER_URL}/users/${userId}`)
    .pipe(
      tap(_=> console.log('fetched user id: ' + userId)),
      catchError(this.handleError<Listing>('getListing'))
    )
  } */
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
  createBooking(startDate, endDate, isApproved, userId, listingId, pricePerDay, priceForStay){
    console.log(startDate, endDate, isApproved, userId, listingId, pricePerDay, priceForStay)
    return this.httpClient.post(`${this.SERVER_URL}/bookings`,{
      startDate, endDate, isApproved, userId, listingId, pricePerDay, priceForStay
    }).pipe(
      tap(_=> console.log('created booking')),
      catchError(this.handleError<any>('createBooking',[]))
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

