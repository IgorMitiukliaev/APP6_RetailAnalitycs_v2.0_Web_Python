import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    request = this.injectTokenIntoRequest(request)
    return next.handle(request).pipe(
      catchError((error) => {
        console.log("intercept catchError")
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private injectTokenIntoRequest(request: HttpRequest<any>): HttpRequest<any> {
    let token = this.authService.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isAuthenticated()) {
      console.log("this.authService.isAuthenticated()")
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          console.log("return next.handle(request);")
          request = this.injectTokenIntoRequest(request)
          return next.handle(request);
        }),
        catchError((error) => {
          console.log("catchError((error) => {)")

          if (error.status == '403') {
            this.authService.logout();
          }

          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
 }
