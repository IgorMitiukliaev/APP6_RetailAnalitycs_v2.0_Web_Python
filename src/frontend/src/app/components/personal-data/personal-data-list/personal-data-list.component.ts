import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalData } from '@classes/personal-data';
import { MatTableModule } from '@angular/material/table';
import { RetailApiServiceService } from '@services/retail-api-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { PersonalDataFormComponent } from '@components/personal-data/personal-data-form/personal-data-form.component';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { error } from 'console';

@Component({
  selector: 'app-personal-data-list',
  templateUrl: './personal-data-list.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule],
  standalone: true,
  styleUrls: ['./personal-data-list.component.scss']
})
export class PersonalDataListComponent implements OnInit {
  displayedColumns: string[] = ['customer_id', 'customer_name', 'customer_surname', 'customer_primary_email', 'customer_primary_phone', 'actions'];
  personalDataList: PersonalData[] = [];

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.retailApiServiceService.getPersonalData().subscribe(data => {
      this.personalDataList = data;
    },
    error => {
      this.dialog.open(ErrorDialogComponent, error);
    });
  }

  edit(item: PersonalData): void {
    // Open the edit dialog component and pass the item data as an argument
    const dialogRef = this.dialog.open(PersonalDataFormComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, update the item data with the result
        this.retailApiServiceService.updatePersonalData(result).subscribe({
          next: () => {
            this.getData();
          },
          error: error => {
            this.dialog.open(ErrorDialogComponent, error);
          }
        });
      }
    });
  }
  deleteItem(item: PersonalData): void {
    this.retailApiServiceService.deletePersonalData(item.customer_id).subscribe({
      next: () => {
        this.getData();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, error);
      }
  })
  }

}