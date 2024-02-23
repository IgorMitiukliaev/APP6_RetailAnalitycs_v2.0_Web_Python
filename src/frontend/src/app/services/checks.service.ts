import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Check } from '@app/classes/check';
import { environment } from '../../environments/environment'
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  private apiUrl: string = `${environment.apiUrl}/data/checks`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  // A method that returns an observable of Check array
  getChecks(): Observable<Check[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<Check[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into Checks instances
      map((data: any[]) => data.map(item => new Check(item.check_id, item.transaction, item.sku, item.sku_amount, item.sku_summ, item.sku_summ_paid, item.sku_discount)))
    );
  }

  // A method that returns an observable of Check by id
  getCheckById(id: number): Observable<Check> {
    return this.http.get<Check>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new Check(item.check_id, item.transaction, item.sku, item.sku_amount, item.sku_summ, item.sku_summ_paid, item.sku_discount))
    );
  }

  // A method that updates Check
  updateCheck(check: Check): Observable<Check> {
    return this.http.put<Check>(`${this.apiUrl}/${check.check_id}/`, check).pipe(
      map((item: any) => new Check(item.check_id, item.transaction, item.sku, item.sku_amount, item.sku_summ, item.sku_summ_paid, item.sku_discount))
    );
  }

  // A method that deletes Check by id
  deleteCheck(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates Check with provided data
  createCheck(check: Check): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, check);
  }

  canChange(): boolean {
    return this.authService.can("data.change_checks");
  }

  canAdd(): boolean {
    return this.authService.can("data.add_checks");
  }

  canDelete(): boolean {
    return this.authService.can("data.delete_checks");
  }
}