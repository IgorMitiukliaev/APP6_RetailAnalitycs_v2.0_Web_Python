import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataComponent } from '@pages/data/data.component';
import { OffersComponent } from '@pages/offers/offers.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataComponent, OffersComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
