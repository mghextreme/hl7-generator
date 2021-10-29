import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppComponent } from './app.component';
import { pagesComponents } from './app.routes';
import { TranslateLoaderMock } from './testing/translate-loader-mock';
import { MessageConfigurationService } from './services';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock
          },
        }),
        RouterTestingModule,
        ClipboardModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AutoCompleteModule,
        ButtonModule,
        CalendarModule,
        ChipsModule,
        SplitButtonModule,
        InputSwitchModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        ListboxModule,
        DropdownModule,
        DynamicDialogModule,
        TableModule,
      ],
      declarations: [
        AppComponent,
        ...pagesComponents
      ],
      providers: [
        ConfirmationService,
        DialogService,
        MessageConfigurationService
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have correct title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  });
});
