import moment from 'moment';
import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';

export class DateField extends BaseField<DateField> {
  value?: Date;

  constructor(
    fieldNumber: number,
    id: string,
    i18n?: string
  ) {
    super(
      FieldType.Date,
      fieldNumber,
      id,
      i18n);

    this.value = new Date();
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null;
  }

  public setValue(value: any): void {
    if (value instanceof Date) {
      this.value = value;
    } else if (value instanceof String || typeof(value) === 'string') {
      if (value.length > 0) {
        this.value = moment(value.toString(), 'YYYYMMDD').toDate();
      } else {
        this.value = null;
      }
    }

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.value.getFullYear().toString().padStart(4, '0') +
      (this.value.getMonth() + 1).toString().padStart(2, '0') +
      this.value.getDate().toString().padStart(2, '0');
  }
}
