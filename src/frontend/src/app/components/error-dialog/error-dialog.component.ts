import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatCardModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  // The input data for the dialog
  error: any;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
    this.error = { ...this.data };
  }

  // Close the dialog and emit the retry action
  retry(): void {
    this.dialogRef.close('retry');
  }

  // Close the dialog and emit the cancel action
  close(): void {
    this.dialogRef.close('close');
  }

}