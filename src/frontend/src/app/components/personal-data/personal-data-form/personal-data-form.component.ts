import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalData } from '@classes/personal-data';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./personal-data-form.component.scss']
})

export class PersonalDataFormComponent implements OnInit {

  // The input data for the dialog
  personalDataForm: FormGroup;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<PersonalDataFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: PersonalData
  ) { 
    this.personalDataForm = new FormGroup({
      customer_id: new FormControl(this.data.customer_id, Validators.required),
      customer_name: new FormControl(this.data.customer_name, Validators.required),
      customer_surname: new FormControl(this.data.customer_surname, Validators.required),
      customer_primary_email: new FormControl(this.data.customer_primary_email, [Validators.required]),
      customer_primary_phone: new FormControl(this.data.customer_primary_phone, Validators.required)
    });
  }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
  }

  // Close the dialog and emit the updated data
  save(): void {
    this.dialogRef.close(this.personalDataForm.value);
  }

  // Close the dialog and emit null
  cancel(): void {
    this.dialogRef.close(null);
  }

}