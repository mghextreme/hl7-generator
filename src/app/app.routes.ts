import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SendComponent } from './components/send/send.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

const appRoutes: Routes = [
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: 'build',
    redirectTo: '/'
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'send',
    component: SendComponent
  },
  {
    path: 'configuration',
    redirectTo: '/configure'
  },
  {
    path: 'configure',
    component: ConfigurationComponent
  }
];

const pagesComponents = [
  HomeComponent,
  SendComponent,
  ConfigurationComponent
];

export { appRoutes, pagesComponents };
