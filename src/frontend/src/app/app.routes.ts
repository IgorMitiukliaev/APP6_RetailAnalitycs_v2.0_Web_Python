import { Routes } from '@angular/router';
import { DataComponent } from '@pages/data/data.component';
import { OffersComponent } from '@pages/offers/offers.component';
import { AppComponent } from '@app/app.component';
import { IndexComponent } from '@pages/index/index.component';
import { DefaultLayoutComponent } from '@layouts/default/default.component';

export const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            { path: '', component: IndexComponent},
            { path: 'data', component: DataComponent },
            { path: 'offers', component: OffersComponent}
        ]
    },
    
];
