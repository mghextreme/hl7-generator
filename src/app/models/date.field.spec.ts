import { DateField } from './date.field';

describe('DateField', () => {

  const NUMBER = 1;
  const ID = 'date.1';

  let model: DateField;

  beforeEach(() => {
    model = new DateField(NUMBER, ID);
  });

  it('constructor - set default', () => {
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toBeDefined();
    expect(model.fieldNumber).toEqual(NUMBER);
    expect(model.id).toEqual(ID);
    expect(model.i18n).toEqual('sections.' + ID);
  });

  it('set value - string', () => {
    model.setValue('20200201');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2020, 1, 1));
    expect(model.toString()).toEqual('20200201');
  });

  it('set value - date', () => {
    model.setValue(new Date(2021, 2, 4));
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2021, 2, 4));
    expect(model.toString()).toEqual('20210304');
  });

  it('set value - set expanded', () => {
    model.expanded = false;
    model.setValue('20200605');
    expect(model.expanded).toBeTruthy();
    expect(model.hasValueAndExpanded()).toBeTruthy();
  });
});
