import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sku } from '@app/classes/sku';
import { environment } from '../../environments/environment'
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  private apiUrl: string = `${environment.apiUrl}/data/sku`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  // A method that returns an observable of Sku array
  getSkus(): Observable<Sku[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<Sku[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into Skus instances
      map((data: any[]) => data.map(item => new Sku(item.sku_id, item.sku_name, item.group)))
    );
  }

  // A method that returns an observable of Sku by id
  getSkuById(id: number): Observable<Sku> {
    return this.http.get<Sku>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new Sku(item.sku_id, item.sku_name, item.group))
    );
  }

  // A method that updates Sku
  updateSku(sku: Sku): Observable<Sku> {
    return this.http.put<Sku>(`${this.apiUrl}/${sku.sku_id}/`, sku).pipe(
      map((item: any) => new Sku(item.sku_id, item.sku_name, item.group))
    );
  }

  // A method that deletes Sku by id
  deleteSku(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates Sku with provided data
  createSku(sku: Sku): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, sku);
  }
  canChange(): boolean {
    return this.authService.can("data.change_sku");
  }

  canAdd(): boolean {
    return this.authService.can("data.add_sku");
  }

  canDelete(): boolean {
    return this.authService.can("data.delete_sku");
  }
}
