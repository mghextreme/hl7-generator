import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';

import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';

import { appRoutes, pagesComponents } from './app.routes';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SectionComponent } from './components/section/section.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '-lang.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    ...pagesComponents
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,  // <-- debugging purposes only
        onSameUrlNavigation: 'reload'
      }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    SplitButtonModule,
    InputSwitchModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ListboxModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
