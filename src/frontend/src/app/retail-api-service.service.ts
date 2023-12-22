import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalData } from './personal-data';

@Injectable({
  providedIn: 'root'
})
export class RetailApiServiceService {

  constructor(private http: HttpClient) { }
  
  // The URL of your REST API endpoint
  private apiUrl = 'http://localhost:8000/data/api/personaldata/';

  // A method that returns an observable of User array
  getPersonalData(): Observable<PersonalData[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<PersonalData[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into User instances
      map((data: any[]) => data.map(item => new PersonalData(item.customer_id, item.customer_name, item.customer_surname, item.customer_primary_email, item.customer_primary_phone)))
    );
  }
}

