import { async, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'app/testing/translate-loader-mock';
import { IOption } from '.';
import { FieldType } from './field-type.enum';
import { OptionsField } from './fields';

describe('OptionsField', () => {

  const NUMBER = 1;
  const ID = 'options.1';

  let model: OptionsField;

  const options: IOption[] = [
    { value: '', i18n: 'Empty' },
    { value: '1', i18n: 'One' },
    { value: 'text', i18n: 'Some long text' },
    { value: 'new', i18n: 'New value' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock
          },
        })
      ],
      providers: [ TranslateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const translate = TestBed.inject(TranslateService);
    model = new OptionsField(translate, NUMBER, ID, options);
  });

  it('constructor - set default', () => {
    expect(model.type).toEqual(FieldType.Options);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toBeDefined();
    expect(model.fieldNumber).toEqual(NUMBER);
    expect(model.id).toEqual(ID);
    expect(model.i18n).toEqual('sections.' + ID);
  });

  it('constructor - force empty option', () => {
    const translate = TestBed.inject(TranslateService);
    model = new OptionsField(translate, NUMBER, ID, [{ value: 'single', i18n: 'Single' }]);

    expect(model.selectItems.length).toEqual(2);
    expect(model.selectItems.find(x => x.value === '')).toBeDefined();
  });

  it('set value - existing', () => {
    model.setValue('1');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual('1');
    expect(model.toString()).toEqual('1');

    model.setValue('text');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual('text');
    expect(model.toString()).toEqual('text');

    model.setValue('');
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toEqual('');
    expect(model.toString()).toEqual('');
  });

  it('set value - non existing - editable', () => {
    model.setValue('crazy-different');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual('crazy-different');
    expect(model.toString()).toEqual('crazy-different');
  });

  it('set value - non existing - non editable', () => {
    model.editable = false;
    model.setValue('crazy-different');
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toEqual('');
    expect(model.toString()).toEqual('');
  });

  it('set value - set expanded', () => {
    model.expanded = false;
    model.setValue('new');
    expect(model.expanded).toBeTruthy();
    expect(model.hasValueAndExpanded()).toBeTruthy();
  });
});
