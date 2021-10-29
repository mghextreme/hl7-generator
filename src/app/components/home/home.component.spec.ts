import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'app/testing/translate-loader-mock';
import { DialogService } from 'primeng/dynamicdialog';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      declarations: [ HomeComponent ],
      providers: [
        DialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
