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
import { SkuGroup } from '@app/classes/sku-group';
import { Sku } from '@app/classes/sku';
import { MatSelectModule } from '@angular/material/select';

export interface SkuFormData {
  sku: Sku;
  skuGroupsList: SkuGroup[];
  isEditOnly: boolean;
};

@Component({
  selector: 'app-sku-form',
  templateUrl: './sku-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./sku-form.component.scss']
})
export class SkuFormComponent implements OnInit {

  // The input data for the dialog
  skuForm: FormGroup;
  skuGroupsList: SkuGroup[] = [];
  @Input('isEditOnly') isEditOnly: boolean = false;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<SkuFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: SkuFormData
  ) {
    this.isEditOnly = data.isEditOnly
    this.skuForm = new FormGroup({
      sku_id: new FormControl(this.data.sku.sku_id, !this.isEditOnly ? Validators.required : null),
      sku_name: new FormControl(this.data.sku.sku_name, [Validators.required]),
      group: new FormControl(this.data.sku.group, [Validators.required]),
    });
    this.skuGroupsList = data.skuGroupsList;
    console.log(this.skuGroupsList)
  }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
  }

  // Close the dialog and emit the updated data
  save(): void {
    this.dialogRef.close(this.skuForm.value);
  }

  // Close the dialog and emit null
  cancel(): void {
    this.dialogRef.close(null);
  }

}