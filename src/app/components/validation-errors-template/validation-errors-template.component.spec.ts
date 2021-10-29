import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IValidationError } from 'app/models';
import { TranslateLoaderMock } from 'app/testing/translate-loader-mock';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidationErrorsTemplate } from './validation-errors-template.component';

class DynamicDialogConfigMock extends DynamicDialogConfig {
  data = {
    errors: [
      {
        errorCode: 'validation.errors.message-empty',
        fieldNumber: 1,
        sectionId: 'complex-guid-here'
      } as IValidationError
    ]
  };
}

describe('ValidationErrorsTemplate', () => {
  let component: ValidationErrorsTemplate;
  let fixture: ComponentFixture<ValidationErrorsTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock
          },
        }),
        RouterModule.forRoot([])
      ],
      declarations: [ ValidationErrorsTemplate ],
      providers:[
        DynamicDialogRef,
        { provide: DynamicDialogConfig, useValue: new DynamicDialogConfigMock() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorsTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
