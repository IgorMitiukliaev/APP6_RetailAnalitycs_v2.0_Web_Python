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
import { Store } from '@app/classes/store';
import { MatSelectModule } from '@angular/material/select';

export interface SkuFormData {
  store: Store;
  skusList: Sku[];
  isEditOnly: boolean;
};

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {

  // The input data for the dialog
  storeForm: FormGroup;
  skusList: Sku[] = [];
  @Input('isEditOnly') isEditOnly: boolean = false;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<StoreFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: SkuFormData
  ) {
    this.isEditOnly = data.isEditOnly
    this.storeForm = new FormGroup({
      transaction_store_id: new FormControl(this.data.store.transaction_store_id, !this.isEditOnly ? Validators.required : null),
      sku: new FormControl(this.data.store.sku, [Validators.required]),
      sku_purchase_price: new FormControl(this.data.store.sku_purchase_price, [Validators.required]),
      sku_retail_price: new FormControl(this.data.store.sku_retail_price, [Validators.required]),
    });
    this.skusList = this.data.skusList;
  }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
  }

  // Close the dialog and emit the updated data
  save(): void {
    this.dialogRef.close(this.storeForm.value);
  }

  // Close the dialog and emit null
  cancel(): void {
    this.dialogRef.close(null);
  }

}