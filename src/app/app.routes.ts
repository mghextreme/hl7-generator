import { Routes } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
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
  },
  {
    path: 'configuration',
    component: ConfigurationComponent
  }
];

const pagesComponents = [
  HomeComponent,
  ConfigurationComponent
];

export { appRoutes, pagesComponents };
