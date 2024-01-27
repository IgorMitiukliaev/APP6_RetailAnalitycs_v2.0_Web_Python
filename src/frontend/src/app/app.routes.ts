import { Routes, mapToCanActivate } from '@angular/router';
import { DataComponent } from '@pages/data/data.component';
import { OffersComponent } from '@pages/offers/offers.component';
import { IndexComponent } from '@pages/index/index.component';
import { DefaultLayoutComponent } from '@layouts/default/default.component';
import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './pages/about/about.component';
export const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'data',
                component: DataComponent,
                canActivate: mapToCanActivate([AuthGuard]),
            },
            {
                path: 'offers',
                component: OffersComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
        ]
    },
    
];
