import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultLayoutComponent {

}
