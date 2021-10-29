import { DateTimeField, FieldType } from './fields';

describe('DateTimeField', () => {

  const NUMBER = 1;
  const ID = 'datetime.1';

  let model: DateTimeField;

  beforeEach(() => {
    model = new DateTimeField(NUMBER, ID);
  });

  it('constructor - set default', () => {
    expect(model.type).toEqual(FieldType.DateTime);
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toBeDefined();
    expect(model.fieldNumber).toEqual(NUMBER);
    expect(model.id).toEqual(ID);
    expect(model.i18n).toEqual('sections.' + ID);
  });

  it('set value - string without time', () => {
    model.setValue('20200102');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2020, 0, 2));
    expect(model.toString()).toEqual('202001020000');
  });

  it('set value - string with time no seconds', () => {
    model.setValue('202003040506');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2020, 2, 4, 5, 6));
    expect(model.toString()).toEqual('202003040506');
  });

  it('set value - string with time and seconds', () => {
    model.includeSeconds = true;
    model.setValue('20200304050607');
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2020, 2, 4, 5, 6, 7));
    expect(model.toString()).toEqual('20200304050607');
  });

  it('set value - date without time', () => {
    model.setValue(new Date(2020, 0, 2));
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2020, 0, 2));
    expect(model.toString()).toEqual('202001020000');
  });

  it('set value - date with time and seconds', () => {
    model.includeSeconds = true;
    model.setValue(new Date(2020, 2, 4, 5, 6, 7));
    expect(model.hasValue()).toBeTruthy();
    expect(model.value).toEqual(new Date(2020, 2, 4, 5, 6, 7));
    expect(model.toString()).toEqual('20200304050607');
  });

  it('set value - set expanded', () => {
    model.expanded = false;
    model.setValue('20200102030405');
    expect(model.expanded).toBeTruthy();
    expect(model.hasValueAndExpanded()).toBeTruthy();
  });
});
