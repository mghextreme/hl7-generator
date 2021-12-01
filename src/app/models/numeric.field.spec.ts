import { FieldType, NumericField } from './fields';

describe('NumericField', () => {

  const NUMBER = 1;
  const ID = 'numeric.1';

  let model: NumericField;

  beforeEach(() => {
    model = new NumericField(NUMBER, ID);
  });

  it('constructor - set default', () => {
    expect(model.type).toEqual(FieldType.Number);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toBeNull();
    expect(model.fieldNumber).toEqual(NUMBER);
    expect(model.id).toEqual(ID);
    expect(model.i18n).toEqual('sections.' + ID);
  });

  it('set value - valid number', () => {
    const sample = 30;
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(sample);
    expect(model.toString()).toEqual('30');
  });

  it('set value - valid negative number', () => {
    model.acceptNegatives = true;
    const sample = -15;
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(sample);
    expect(model.toString()).toEqual('-15');
  });

  it('set value - valid float number', () => {
    model.acceptFractions = true;
    const sample = 8.41;
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(sample);
    expect(model.toString()).toEqual('8.41');
  });

  it('set value - valid negative float number', () => {
    model.acceptNegatives = true;
    model.acceptFractions = true;
    const sample = -90.197;
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(sample);
    expect(model.toString()).toEqual('-90.197');
  });

  it('set value - valid string', () => {
    const sample = '145';
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(145);
    expect(model.toString()).toEqual(sample);
  });

  it('set value - valid object', () => {
    const sample = '9';
    model.setValue({ toString: () => sample });
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(9);
    expect(model.toString()).toEqual(sample);
  });

  it('set value - undefined', () => {
    model.setValue(undefined);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toBeNull();
    expect(model.toString()).toEqual('');
  });

  it('set value - invalid string', () => {
    const sample = 'Some text';
    model.setValue(sample);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toBeNull();
    expect(model.toString()).toEqual('');
  });

  it('set value - invalid negative', () => {
    const sample = -41;
    model.setValue(sample);
    expect(model.hasValue()).toBeFalsy();
    expect(model.value).toBeNull();
    expect(model.toString()).toEqual('');
  });

  it('set value - invalid float - floors to int', () => {
    const sample = '18.748';
    model.setValue(sample);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(18);
    expect(model.toString()).toEqual('18');
  });

  it('set value - set expanded', () => {
    model.expanded = false;
    model.setValue(72);
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
