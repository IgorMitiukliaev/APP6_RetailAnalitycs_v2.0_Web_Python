import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalData } from '@classes/personal-data';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface PersonalDataFormData {
  personalData: PersonalData;
  isEditOnly: boolean;
};

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule],
  standalone: true,
  styleUrls: ['./personal-data-form.component.scss']
})
export class PersonalDataFormComponent implements OnInit {

  // The input data for the dialog
  personalDataForm: FormGroup;
  @Input('isEditOnly') isEditOnly: boolean = false;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<PersonalDataFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: PersonalDataFormData
  ) {
    this.isEditOnly = data.isEditOnly
    this.personalDataForm = new FormGroup({
      customer_id: new FormControl(this.data.personalData.customer_id, !this.isEditOnly ? Validators.required : null),
      customer_name: new FormControl(this.data.personalData.customer_name, [Validators.required, Validators.maxLength(255)]),
      customer_surname: new FormControl(this.data.personalData.customer_surname, [Validators.required, Validators.maxLength(255)]),
      customer_primary_email: new FormControl(this.data.personalData.customer_primary_email, [Validators.maxLength(255)]),
      customer_primary_phone: new FormControl(this.data.personalData.customer_primary_phone, [Validators.maxLength(15)])
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