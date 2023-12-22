import { Component, OnInit } from '@angular/core';
import { RetailApiServiceService } from '../retail-api-service.service';
import { PersonalData } from '../personal-data';

@Component({
  selector: 'crud-view-component',
  templateUrl: './crud-view.component.html',
  styleUrls: ['./crud-view.component.scss']
})
export class CRUDViewComponent implements OnInit {

  // A local variable to store the user data
  personalData: PersonalData[] = [];

  constructor(private apiService: RetailApiServiceService) { }

  ngOnInit(): void {
    // Subscribe to the observable returned by the service method
    this.apiService.getPersonalData().subscribe(
      // Assign the data to the local variable
      data => this.personalData = data
    );
  }
}