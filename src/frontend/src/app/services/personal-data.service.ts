import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalData } from '../classes/personal-data';
import { environment } from '../../environments/environment'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl: string = `${environment.apiUrl}/data/personaldata`;
  constructor(private http: HttpClient) {
  }

  // A method that returns an observable of User array
  getPersonalData(): Observable<PersonalData[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<PersonalData[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into User instances
      map((data: any[]) => data.map(item => new PersonalData(item.customer_id, item.customer_name, item.customer_surname, item.customer_primary_email, item.customer_primary_phone)))
    );
  }
    // A method that returns an observable of PersonalData by id
  getPersonalDataById(id: number): Observable<PersonalData> {
    return this.http.get<PersonalData>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new PersonalData(item.customer_id, item.customer_name, item.customer_surname, item.customer_primary_email, item.customer_primary_phone))
    );
  }

  // A method that updates PersonalData
  updatePersonalData(personalData: PersonalData): Observable<PersonalData> {
    return this.http.put<PersonalData>(`${this.apiUrl}/${personalData.customer_id}/`, personalData).pipe(
      map((item: any) => new PersonalData(item.customer_id, item.customer_name, item.customer_surname, item.customer_primary_email, item.customer_primary_phone))
    );
  }

  // A method that deletes PersonalData by id
  deletePersonalData(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates PersonalData with provided data
  createPersonalData(personalData: PersonalData): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, personalData);
  }
}
