import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '@app/components/auth/auth.component';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean> | boolean {
    if (!this.authService.isAuthenticated) {
      if (this.router.navigated) {
        const authDialogRef = this.dialog.open(AuthComponent);
        const event: Observable<any> = authDialogRef.afterClosed() 
        event.subscribe({
          next: data => {
            this.router.navigate([state.url]);
          },
        });
        return event;
      } else {
        this.router.navigate(['/']);
      }
    }
    return true;
  }
}