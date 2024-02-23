import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { RetailApiServiceService } from '@services/retail-api-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SkuFormComponent } from '../form/sku-form.component';
import { SkuGroup } from '@app/classes/sku-group';
import { Sku } from '@app/classes/sku';

@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule, MatDialogModule, MatToolbarModule],
  standalone: true,
  styleUrls: ['./sku-list.component.scss']
})
export class SkuListComponent implements OnInit {
  displayedColumns: string[] = ["sku_id", "sku_name", "group"];
  skuGroupsList: Map<number, SkuGroup> = new Map<number, SkuGroup>();
  skusList: Sku[] = [];

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userCanChange() || this.userCanDelete()) {
      this.displayedColumns.push('actions');
    }
    this.getData();
  }

  userCanChange(): boolean {
    return this.retailApiServiceService.canChangeSku();
  }

  userCanDelete(): boolean {
    return this.retailApiServiceService.canDeleteSku();
  }

  userCanAdd(): boolean {
    return this.retailApiServiceService.canAddSku();
  }

  getData(): void {
    this.retailApiServiceService.fetchSkuGroups()
    this.retailApiServiceService.fetchSkus()
    this.retailApiServiceService.getSkuGroups().subscribe(
      {
        next: data => {
          this.skuGroupsList = data;
        }
      }
    )
    this.retailApiServiceService.getSkus().subscribe(
      {
        next: data => {
          this.skusList = Array.from(data.values());
        }
      }
    )
  }
  newItem(): void {
    const dialogRef = this.dialog.open(SkuFormComponent, {
      data: {
        sku: {},
        skuGroupsList: Array.from(this.skuGroupsList.values()),
        isEditOnly: false
    }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, create the item data with the result
        this.retailApiServiceService.createSku(result).subscribe({
          next: () => {
            this.getData();
          },
          error: error => {
            this.dialog.open(ErrorDialogComponent, {data: error});
          }
        });
      }
    });
  }

  edit(item: Sku): void {
    // Open the edit dialog component and pass the item data as an argument
    const dialogRef = this.dialog.open(SkuFormComponent, {
      data: {
        sku: item,
        skuGroupsList: Array.from(this.skuGroupsList.values()),
        isEditOnly: false
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, update the item data with the result
        this.retailApiServiceService.updateSku(result).subscribe({
          next: () => {
            this.getData();
          },
          error: error => {
            this.dialog.open(ErrorDialogComponent, {data: error});
          }
        });
      }
    });
  }
  deleteItem(item: Sku): void {
    this.retailApiServiceService.deleteSkuGroup(item.sku_id).subscribe({
      next: () => {
        this.getData();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
  })
  }

}