import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@app/classes/store';
import { environment } from '../../environments/environment'
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl: string = `${environment.apiUrl}/data/stores`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  // A method that returns an observable of Store array
  getStores(): Observable<Store[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<Store[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into Stores instances
      map((data: any[]) => data.map(item => new Store(item.transaction_store_id, item.sku, item.sku_purchase_price, item.sku_retail_price)))
    );
  }

  // A method that returns an observable of Store by id
  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new Store(item.transaction_store_id, item.sku, item.sku_purchase_price, item.sku_retail_price))
    );
  }

  // A method that updates Store
  updateStore(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.apiUrl}/${store.transaction_store_id}/`, store).pipe(
      map((item: any) => new Store(item.transaction_store_id, item.sku, item.sku_purchase_price, item.sku_retail_price))
    );
  }

  // A method that deletes Store by id
  deleteStore(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates Store with provided data
  createStore(store: Store): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, store);
  }

  canChange(): boolean {
    return this.authService.can("data.change_stores");
  }

  canAdd(): boolean {
    return this.authService.can("data.add_stores");
  }

  canDelete(): boolean {
    return this.authService.can("data.delete_stores");
  }
}
