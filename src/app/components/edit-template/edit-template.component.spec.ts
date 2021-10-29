import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'app/testing/translate-loader-mock';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditTemplateComponent } from './edit-template.component';

class DynamicDialogConfigMock extends DynamicDialogConfig {
  data = {
    isNew: true
  };
}

describe('EditTemplate', () => {
  let component: EditTemplateComponent;
  let fixture: ComponentFixture<EditTemplateComponent>;

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
      declarations: [ EditTemplateComponent ],
      providers: [
        DynamicDialogRef,
        { provide: DynamicDialogConfig, useValue: new DynamicDialogConfigMock() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    console.log(1);
    fixture = TestBed.createComponent(EditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
