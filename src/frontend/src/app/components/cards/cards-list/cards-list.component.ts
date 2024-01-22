import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalData } from '@classes/personal-data';
import { MatTableModule } from '@angular/material/table';
import { RetailApiServiceService } from '@services/retail-api-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CardFormComponent } from '../card-form/card-form.component';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Card } from '@app/classes/card';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule, MatDialogModule, MatToolbarModule],
  standalone: true,
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  displayedColumns: string[] = ['customer_card_id', 'customer', 'actions'];
  cardsList: Card[] = [];
  personalDataList: Map<number, PersonalData> = new Map<number, PersonalData>();

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.retailApiServiceService.fetchCards();
    this.retailApiServiceService.fetchPersonalData();
    this.retailApiServiceService.getCards().subscribe(
      {
        next: data => {
          this.cardsList = Array.from(data.values());
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
    const dialogRef = this.dialog.open(CardFormComponent, {
      data: {
        card: {},
        personalDataList: Array.from(this.personalDataList.values()),
        isEditOnly: false
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, create the item data with the result
        this.retailApiServiceService.createCard(result).subscribe({
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

  edit(item: Card): void {
    // Open the edit dialog component and pass the item data as an argument
    const dialogRef = this.dialog.open(CardFormComponent, {
      data: {
        card: item,
        isEditOnly: true,
        personalDataList: Array.from(this.personalDataList.values())
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is not null, update the item data with the result
        this.retailApiServiceService.updateCard(result).subscribe({
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
  deleteItem(item: Card): void {
    this.retailApiServiceService.deleteCard(item.customer_card_id).subscribe({
      next: () => {
        this.getData();
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
  })
  }

}