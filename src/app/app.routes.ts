import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

const pagesComponents = [
  HomeComponent
];

export { appRoutes, pagesComponents };
