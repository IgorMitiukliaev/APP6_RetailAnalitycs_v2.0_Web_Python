import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Sku } from '@app/classes/sku';
import { Transaction } from '@app/classes/transaction';
import { Check } from '@app/classes/check';
import { MatSelectModule } from '@angular/material/select';

export interface CheckFormData {
  check: Check;
  transactionsList:  Transaction[];
  skuList:  Sku[];
  isEditOnly: boolean;
};

@Component({
  selector: 'app-checks-form',
  templateUrl: './checks-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./checks-form.component.scss']
})
export class ChecksFormComponent implements OnInit {

  // The input data for the dialog
  checkForm: FormGroup;
  transactionsList:  Transaction[];
  skuList:  Sku[];
  @Input('isEditOnly') isEditOnly: boolean = false;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<ChecksFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: CheckFormData
  ) {
    this.isEditOnly = data.isEditOnly
    this.checkForm = new FormGroup({
      check_id: new FormControl(this.data.check.check_id, !this.isEditOnly ? Validators.required : null),
      transaction: new FormControl(this.data.check.transaction, [Validators.required]),
      sku: new FormControl(this.data.check.sku, [Validators.required]),
      sku_amount: new FormControl(this.data.check.sku_amount, [Validators.required]),
      sku_summ: new FormControl(this.data.check.sku_summ, [Validators.required]),
      sku_summ_paid: new FormControl(this.data.check.sku_summ_paid, [Validators.required]),
      sku_discount: new FormControl(this.data.check.sku_discount, [Validators.required]),
      
    });
    this.transactionsList = data.transactionsList
    console.log(this.transactionsList)
    this.skuList = data.skuList
  }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
  }

  // Close the dialog and emit the updated data
  save(): void {
    this.dialogRef.close(this.checkForm.value);
  }

  // Close the dialog and emit null
  cancel(): void {
    this.dialogRef.close(null);
  }

}