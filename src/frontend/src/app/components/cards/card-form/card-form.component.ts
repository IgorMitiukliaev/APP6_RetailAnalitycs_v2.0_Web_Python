import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '@classes/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PersonalData } from '@app/classes/personal-data';
import { MatSelectModule } from '@angular/material/select';

export interface CardFormData {
  card: Card;
  personalDataList: PersonalData[];
  isEditOnly: boolean;
};

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  // The input data for the dialog
  cardForm: FormGroup;
  personalDataList:  PersonalData[];
  
  @Input('isEditOnly') isEditOnly: boolean = false;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<CardFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: CardFormData
  ) {
    this.isEditOnly = data.isEditOnly
    this.cardForm = new FormGroup({
      customer_card_id: new FormControl(this.data.card.customer_card_id, !this.isEditOnly ? Validators.required : null),
      customer: new FormControl(this.data.card.customer, [Validators.required])
    });
    this.personalDataList = data.personalDataList
  }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
  }

  // Close the dialog and emit the updated data
  save(): void {
    console.log(this.cardForm.value)
    this.dialogRef.close(this.cardForm.value);
  }

  // Close the dialog and emit null
  cancel(): void {
    this.dialogRef.close(null);
  }

}