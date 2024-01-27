import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@app/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { AuthComponent } from '../auth/auth.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatTabsModule, MatToolbarModule, MatDividerModule, MatButtonModule, MatDividerModule, MatMenuModule, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public currentUserName: string = ""
  public isLoggedIn: boolean = false
  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated
    this.subscribeToAuth()
  }

  subscribeToAuth(): void {
    this.authService.isLoggedIn$.subscribe({
      next: (v: boolean) => {
        this.isLoggedIn = v
      }
    })
    this.authService.userName$.subscribe({
      next: (v: string) => {
        this.currentUserName = v
      }
    })
  }

  openSignInDialog(): void {
    const authDialogRef = this.dialog.open(AuthComponent);
      const event: Observable<any> = authDialogRef.afterClosed() 
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/'])
  }

}
