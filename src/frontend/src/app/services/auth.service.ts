import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@app/components/error-dialog/error-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn : boolean = false;
  private apiUrl: string = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) { }

  login(username: string, password: string): Observable<any> {
    const response: Observable<any> = this.http.post(`${this.apiUrl}/`, { username, password })
    console.log({ username, password })
    response.subscribe({
      next: data => {
        this.isLoggedIn= true;
        this.cookieService.set('access_token', data.access);
        this.cookieService.set('refresh_token', data.refresh);
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
    });

    return response.pipe(
      map((response: any) => {
        if (response.status === 200) {
          console.log(response.status)
          return true;
        } else {
          return false;
        }
        })
      );
  }

  getAccessToken(): string | undefined {
    return this.cookieService.get('access_token')
  }

  getRefreshToken(): string | undefined {
    return this.cookieService.get('refresh_token')
  }

  refreshToken(): Observable<any> {
    const event: Observable<any> =  this.http.post(`${this.apiUrl}/refresh/`, { refresh: this.getRefreshToken() })
    event.subscribe({
      next: data => {
        this.isLoggedIn= true;
        this.cookieService.set('access_token', data.access);
      }
    });
    return event;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  } 

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
