import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalData } from '@classes/personal-data';
import { MatTableModule } from '@angular/material/table';
import { RetailApiServiceService } from '@services/retail-api-service.service';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

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

  constructor(private retailApiServiceService: RetailApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.retailApiServiceService.getPersonalData().subscribe(data => {
      this.personalDataList = data;
    });
  }

  edit(item: PersonalData): void {
    this.router.navigate(['/edit', item.customer_id]);
  }

}