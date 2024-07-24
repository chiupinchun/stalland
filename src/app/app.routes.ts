import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Stelland'
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
    title: 'Coming Soon'
  }
];
