import { async, TestBed } from '@angular/core/testing';
import { MessageConfigurationService } from 'app/services';
import { MultipleField, FieldType } from './fields';
import { StringField } from './string.field';

describe('MultipleField', () => {

  const NUMBER = 1;
  const ID = 'multiple.1';

  let model: MultipleField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MessageConfigurationService,
        useValue: {
          componentSeparator: '^',
          subComponentSeparator: '&'
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const messageConfig = TestBed.inject(MessageConfigurationService);
    model = new MultipleField(messageConfig, NUMBER, ID, [
      new StringField(1, 'sub.1'),
      new StringField(2, 'sub.2'),
      new StringField(4, 'sub.4')
    ]);
  });

  it('constructor - set default', () => {
    expect(model.type).toEqual(FieldType.Multiple);
    expect(model.hasValue()).toBeFalsy();
    expect(model.fieldNumber).toEqual(NUMBER);
    expect(model.id).toEqual(ID);
    expect(model.i18n).toEqual('sections.' + ID);
  });

  it('set value - string', () => {
    model.setValue('One^Two^^Four');
    expect(model.hasValue()).toBeTruthy();
    expect((model.getField(1) as StringField).value).toEqual('One');
    expect((model.getField(2) as StringField).value).toEqual('Two');
    expect((model.getField(4) as StringField).value).toEqual('Four');
    expect(model.toString()).toEqual('One^Two^^Four');
  });

  it('set value - array', () => {
    model.setValue([ 'One', 'Two', , 'Four' ]);
    expect(model.hasValue()).toBeTruthy();
    expect((model.getField(1) as StringField).value).toEqual('One');
    expect((model.getField(2) as StringField).value).toEqual('Two');
    expect((model.getField(4) as StringField).value).toEqual('Four');
    expect(model.toString()).toEqual('One^Two^^Four');
  });

  it('set value - ignore non-existing numbers', () => {
    model.setValue('One^Two^Three^^Five');
    expect(model.hasValue()).toBeTruthy();
    expect((model.getField(1) as StringField).value).toEqual('One');
    expect((model.getField(2) as StringField).value).toEqual('Two');
    expect((model.getField(4) as StringField).value).toEqual('');
    expect(model.toString()).toEqual('One^Two');
  });

  it('set value - sub component', () => {
    model.level = 2;
    model.setValue('One&Two&Three&Four&Five&&');
    expect(model.hasValue()).toBeTruthy();
    expect((model.getField(1) as StringField).value).toEqual('One');
    expect((model.getField(2) as StringField).value).toEqual('Two');
    expect((model.getField(4) as StringField).value).toEqual('Four');
    expect(model.toString()).toEqual('One&Two&&Four');
  });

  it('set value - set expanded', () => {
    model.expanded = false;
    model.setValue([ 'One' ]);
    expect(model.expanded).toBeTruthy();
    expect(model.hasValueAndExpanded()).toBeTruthy();
  });
});
