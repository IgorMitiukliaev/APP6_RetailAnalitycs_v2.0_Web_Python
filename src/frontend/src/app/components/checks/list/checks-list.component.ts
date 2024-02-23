import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { RetailApiServiceService } from '@services/retail-api-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { error } from 'console';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChecksFormComponent } from '../form/checks-form.component';
import { Transaction } from '@app/classes/transaction';
import { Sku } from '@app/classes/sku';
import { Check } from '@app/classes/check';
import { PersonalData } from '@app/classes/personal-data';

@Component({
  selector: 'app-checks-list',
  templateUrl: './checks-list.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule, MatDialogModule, MatToolbarModule],
  standalone: true,
  styleUrls: ['./checks-list.component.scss']
})
export class ChecksListComponent implements OnInit {
  displayedColumns: string[] = ["check_id", "transaction", "sku","sku_amount", "sku_summ", "sku_summ_paid", "sku_discount"];
  transactionsList: Map<number, Transaction> = new Map<number, Transaction>();
  skuList: Map<number, Sku> = new Map<number, Sku>();
  personalDataList: Map<number, PersonalData> = new Map<number, PersonalData>();
  checksList: Check[] = [];

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userCanChange() || this.userCanDelete()) {
      this.displayedColumns.push('actions');
    }
    this.getData();
  }

  userCanChange(): boolean {
    return this.retailApiServiceService.canChangeCheck();
  }

  userCanDelete(): boolean {
    return this.retailApiServiceService.canDeleteChecks();
  }

  userCanAdd(): boolean {
    return this.retailApiServiceService.canAddChecks();
  }

  getData(): void {
    this.retailApiServiceService.fetchChecks()
    this.retailApiServiceService.fetchTransactions()
    this.retailApiServiceService.fetchSkus()
    this.retailApiServiceService.fetchPersonalData()
    this.retailApiServiceService.getChecks().subscribe(
      {
        next: data => {
          this.checksList = Array.from(data.values());
        }
      }
    )
    this.retailApiServiceService.getSkus().subscribe(
      {
        next: data => {
          this.skuList = data;
        }
      }
    )
    this.retailApiServiceService.getTransactions().subscribe(
      {
        next: data => {
          this.transactionsList = data;
        }
      }
    )
    this.retailApiServiceService.getPersonalData().subscribe(
      {
        next: data => {
          this.personalDataList = data;
        }
      }
    )
  }
  newItem(): void {
    const dialogRef = this.dialog.open(ChecksFormComponent, {
      data: {
        check: {},
        transactionsList:  this.transactionsList,
        skuList:  this.skuList,
        isEditOnly: false
    }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, create the item data with the result
        this.retailApiServiceService.createCheck(result).subscribe({
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

  edit(item: Check): void {
    // Open the edit dialog component and pass the item data as an argument
    const dialogRef = this.dialog.open(ChecksFormComponent, {
      data: {
        check: item,
        transactionsList:  this.transactionsList,
        skuList:  this.skuList,
        isEditOnly: false
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, update the item data with the result
        this.retailApiServiceService.updateCheck(result).subscribe({
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
  deleteItem(item: Check): void {
    this.retailApiServiceService.deleteCheck(item.check_id).subscribe({
      next: () => {
        this.getData();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
  })
  }

}