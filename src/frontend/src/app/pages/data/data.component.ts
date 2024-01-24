import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs';
import { CardsListComponent } from '@app/components/cards/cards-list/cards-list.component';
import { PersonalDataListComponent } from '@app/components/personal-data/personal-data-list/personal-data-list.component';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, PersonalDataListComponent, CardsListComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

}
