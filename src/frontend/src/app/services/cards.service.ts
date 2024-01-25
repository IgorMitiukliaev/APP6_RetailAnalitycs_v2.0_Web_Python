import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '@classes/card';
import { environment } from '../../environments/environment'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private apiUrl: string = `${environment.apiUrl}/data/cards`;
  constructor(private http: HttpClient) { }

  // A method that returns an observable of Card array
  getCards(): Observable<Card[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<Card[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into Cards instances
      map((data: any[]) => data.map(item => new Card(item.customer_card_id, item.customer)))
    );
  }

  // A method that returns an observable of Card by id
  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new Card(item.customer_card_id, item.customer))
    );
  }

  // A method that updates Card
  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${card.customer_card_id}/`, card).pipe(
      map((item: any) => new Card(item.customer_card_id, item.customer))
    );
  }

  // A method that deletes Card by id
  deleteCard(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates Card with provided data
  createCard(card: Card): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, card);
  }
}
