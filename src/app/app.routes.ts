import { Routes } from '@angular/router';
import { PageHomeComponent } from './components/home/page-home/page-home.component';

const appRoutes: Routes = [
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: '',
    pathMatch: 'full',
    component: PageHomeComponent
  }
];

const pagesComponents = [
  PageHomeComponent
];

export { appRoutes, pagesComponents };
