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
import { SkuGroupFormComponent } from '../form/sku-group-form.component';
import { SkuGroup } from '@app/classes/sku-group';

@Component({
  selector: 'app-sku-group-list',
  templateUrl: './sku-group-list.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule, MatDialogModule, MatToolbarModule],
  standalone: true,
  styleUrls: ['./sku-group-list.component.scss']
})
export class SkuGroupListComponent implements OnInit {
  displayedColumns: string[] = ["group_id", "group_name"];
  skuGroupList: SkuGroup[] = [];

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userCanChange() || this.userCanDelete()) {
      this.displayedColumns.push('actions');
    }
    this.getData();
  }

  userCanChange(): boolean {
    return this.retailApiServiceService.canChangeSkuGroup();
  }

  userCanDelete(): boolean {
    return this.retailApiServiceService.canDeleteSkuGroup();
  }

  userCanAdd(): boolean {
    return this.retailApiServiceService.canAddSkuGroup();
  }

  getData(): void {
    this.retailApiServiceService.fetchSkuGroups()
    this.retailApiServiceService.getSkuGroups().subscribe(
      {
        next: data => {
          this.skuGroupList = Array.from(data.values());
        }
      }
    )
  }
  newItem(): void {
    const dialogRef = this.dialog.open(SkuGroupFormComponent, {
      data: {
        skuGroup: {},
        isEditOnly: false
    }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, create the item data with the result
        this.retailApiServiceService.createSkuGroup(result).subscribe({
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

  edit(item: SkuGroup): void {
    // Open the edit dialog component and pass the item data as an argument
    const dialogRef = this.dialog.open(SkuGroupFormComponent, {
      data: {
        skuGroup: item,
        isEditOnly: false
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, update the item data with the result
        this.retailApiServiceService.updateSkuGroup(result).subscribe({
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
  deleteItem(item: SkuGroup): void {
    this.retailApiServiceService.deleteSkuGroup(item.group_id).subscribe({
      next: () => {
        this.getData();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
  })
  }

}