import { FieldType, StringField } from './fields';

describe('StringField', () => {

  const NUMBER = 1;
  const ID = 'string.1';

  let model: StringField;

  beforeEach(() => {
    model = new StringField(NUMBER, ID);
  });

  it('constructor - set default', () => {
    expect(model.type).toEqual(FieldType.String);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toEqual('');
    expect(model.fieldNumber).toEqual(NUMBER);
    expect(model.id).toEqual(ID);
    expect(model.i18n).toEqual('sections.' + ID);
    expect(model.defaultValue).toEqual('');
  });

  it('set value - string', () => {
    const sample = 'My text';
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(sample);
    expect(model.toString()).toEqual(sample);
  });

  it('set value - object', () => {
    const sample = 'Some text here';
    model.setValue({ toString: () => sample });
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(sample);
    expect(model.toString()).toEqual(sample);
  });

  it('set value - undefined', () => {
    model.setValue(undefined);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toEqual('');
    expect(model.toString()).toEqual('');
  });

  it('set value - set expanded', () => {
    model.expanded = false;
    model.setValue('Any text');
    expect(model.expanded).toBeTruthy();
    expect(model.hasValue()).toBeTruthy();
    expect(model.hasValueAndExpanded()).toBeTruthy();
  });

  it('set value - don\'t set expanded', () => {
    model.expanded = false;
    model.setValue('');
    expect(model.expanded).toBeFalsy();
    expect(model.hasValue()).toBeFalsy();
    expect(model.hasValueAndExpanded()).toBeFalsy();
  });
});
