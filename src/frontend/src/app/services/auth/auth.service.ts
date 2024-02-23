import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject, Observable, map, skip } from 'rxjs';
import { environment } from '../../../environments/environment'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@app/components/error-dialog/error-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private apiUrl: string = `${environment.apiUrl}/auth`;
  private permissions: Array<string> = [];

  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable()
  public userName$: Observable<string> = this.userName.asObservable()

  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) {
    // this.tryLoadAuthFromCache(); TODO!
  }


  login(username: string, password: string): Observable<any> {
    const response: Observable<any> = this.http.post(`${this.apiUrl}/`, { username, password })
    response.subscribe({
      next: data => {
        this.isLoggedIn.next(true);
        this.cookieService.set('access_token', data.access);
        this.cookieService.set('refresh_token', data.refresh);
        this.cookieService.set('username', username);
        this.userName.next(username)
        this.getPermissions();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
    });

    return response.pipe(
      map((response: any) => {
        if (response) {
          return true;
        } else {
          return false;
        }
        })
      );
  }

  get getAccessToken(): string {
    return this.cookieService.get('access_token')
  }

  get getRefreshToken(): string {
    return this.cookieService.get('refresh_token')
  }

  get getUserName(): string {
    return this.cookieService.get('username')
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn.getValue()
  }

  can(permission: string): boolean {
    return this.permissions.some((value) => value == permission)
  }

  getPermissions(): void {
    this.http.get(`${this.apiUrl}/permissions`).subscribe({
      next: (data: any)  => {
        this.cookieService.set('permissions', JSON.stringify(data.permissions));
        this.permissions = data.permissions;
        console.log(data)
      }
    });
  }

  tryLoadAuthFromCache(): void {
    const accessToken = this.cookieService.get('access_token')
    if (accessToken) {
      this.isLoggedIn.next(true);
      this.userName.next(this.cookieService.get('username'));
      this.getPermissions();
    }
  }

  refreshToken(): Observable<any> {
    const event: Observable<any> =  this.http.post(`${this.apiUrl}/refresh/`, { refresh: this.getRefreshToken })
    event.subscribe({
      next: data => {
        this.isLoggedIn.next(true);
        this.cookieService.set('access_token', data.access);
        this.getPermissions();
      }
    });
    return event;
  }

  logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.cookieService.delete('username');
    this.cookieService.delete('permissions');
    this.userName.next("")
    this.isLoggedIn.next(false);
  }
}
