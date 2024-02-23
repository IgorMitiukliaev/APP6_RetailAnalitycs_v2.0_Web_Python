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
import { MatSelectModule } from '@angular/material/select';

export interface SkuFormData {
  skuGroup: SkuGroup;
  isEditOnly: boolean;
};

@Component({
  selector: 'app-sku-group-form',
  templateUrl: './sku-group-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./sku-group-form.component.scss']
})
export class SkuGroupFormComponent implements OnInit {

  // The input data for the dialog
  skuGroupForm: FormGroup;
  @Input('isEditOnly') isEditOnly: boolean = false;

  constructor(
    // The reference to the dialog
    public dialogRef: MatDialogRef<SkuGroupFormComponent>,
    // The data injected into the dialog
    @Inject(MAT_DIALOG_DATA) public data: SkuFormData
  ) {
    this.isEditOnly = data.isEditOnly
    this.skuGroupForm = new FormGroup({
      group_id: new FormControl(this.data.skuGroup.group_id, !this.isEditOnly ? Validators.required : null),
      group_name: new FormControl(this.data.skuGroup.group_name, [Validators.required]),
      
    });
  }

  ngOnInit(): void {
    // Copy the input data to avoid mutating the original object
  }

  // Close the dialog and emit the updated data
  save(): void {
    this.dialogRef.close(this.skuGroupForm.value);
  }

  // Close the dialog and emit null
  cancel(): void {
    this.dialogRef.close(null);
  }

}