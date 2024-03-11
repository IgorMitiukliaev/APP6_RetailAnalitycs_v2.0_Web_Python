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
import { StoreFormComponent } from '../form/store-form.component';
import { Store } from '@app/classes/store';
import { Sku } from '@app/classes/sku';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule, MatDialogModule, MatToolbarModule],
  standalone: true,
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  displayedColumns: string[] = ["transaction_store_id", "sku", "sku_purchase_price", "sku_retail_price"];
  storeList: Store[] = [];
  skusList: Map<number, Sku> = new Map<number, Sku>();

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userCanChange() || this.userCanDelete()) {
      this.displayedColumns.push('actions');
    }
    this.getData();
  }

  userCanChange(): boolean {
    return this.retailApiServiceService.canChangeStore();
  }

  userCanDelete(): boolean {
    return this.retailApiServiceService.canDeleteStore();
  }

  userCanAdd(): boolean {
    return this.retailApiServiceService.canAddStore();
  }

  getData(): void {
    this.retailApiServiceService.fetchSkus()
    this.retailApiServiceService.fetchStores()
    this.retailApiServiceService.getStores().subscribe(
      {
        next: data => {
          this.storeList = Array.from(data.values());
        }
      }
    )
    this.retailApiServiceService.getSkus().subscribe(
      {
        next: data => {
          this.skusList = data;
        }
      }
    )
  }
  newItem(): void {
    const dialogRef = this.dialog.open(StoreFormComponent, {
      data: {
        store: {},
        skusList: Array.from(this.skusList.values()),
        isEditOnly: false
    }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, create the item data with the result
        this.retailApiServiceService.createStore(result).subscribe({
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

  edit(item: Store): void {
    // Open the edit dialog component and pass the item data as an argument
    const dialogRef = this.dialog.open(StoreFormComponent, {
      data: {
        store: item,
        skusList: Array.from(this.skusList.values()),
        isEditOnly: false
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, update the item data with the result
        this.retailApiServiceService.updateStore(result).subscribe({
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
  deleteItem(item: Store): void {
    this.retailApiServiceService.deleteStore(item.transaction_store_id).subscribe({
      next: () => {
        this.getData();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
  })
  }

}