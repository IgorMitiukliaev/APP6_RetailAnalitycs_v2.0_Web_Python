import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SkuGroup } from '@app/classes/sku-group';
import { environment } from '../../environments/environment'
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SkuGroupsService {
  private apiUrl: string = `${environment.apiUrl}/data/groupssku`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  // A method that returns an observable of SkuGroup array
  getSkuGroups(): Observable<SkuGroup[]> {
    // Send a GET request to the API and get the response as JSON
    return this.http.get<SkuGroup[]>(this.apiUrl).pipe(
      // Use the map operator to transform the JSON data into SkuGroups instances
      map((data: any[]) => data.map(item => new SkuGroup(item.group_id, item.group_name)))
    );
  }

  // A method that returns an observable of SkuGroup by id
  getSkuGroupById(id: number): Observable<SkuGroup> {
    return this.http.get<SkuGroup>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new SkuGroup(item.group_id, item.group_name))
    );
  }

  // A method that updates SkuGroup
  updateSkuGroup(skuGroup: SkuGroup): Observable<SkuGroup> {
    return this.http.put<SkuGroup>(`${this.apiUrl}/${skuGroup.group_id}/`, skuGroup).pipe(
      map((item: any) => new SkuGroup(item.group_id, item.group_name))
    );
  }

  // A method that deletes SkuGroup by id
  deleteSkuGroup(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // A method that creates SkuGroup with provided data
  createSkuGroup(skuGroup: SkuGroup): Observable<{}> {
    return this.http.post(`${this.apiUrl}/`, skuGroup);
  }

  canChange(): boolean {
    return this.authService.can("data.change_groupssku");
  }

  canAdd(): boolean {
    return this.authService.can("data.add_groupssku");
  }

  canDelete(): boolean {
    return this.authService.can("data.delete_groupssku");
  }
}
