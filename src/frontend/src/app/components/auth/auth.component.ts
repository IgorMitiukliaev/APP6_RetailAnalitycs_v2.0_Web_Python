import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  authForm: FormGroup;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService
    ) {
    this.authForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close(false);
    })
  }

  login(): void {
    this.authService.login(this.authForm.get('login')?.value, this.authForm.get('password')?.value).subscribe({
      next: result => {
        this.dialogRef.close(result);
      }
    })
    
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}

