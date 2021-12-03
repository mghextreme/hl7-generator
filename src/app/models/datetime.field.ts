import moment from 'moment';
import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';

export class DateTimeField extends BaseField<DateTimeField> {
  value?: Date;
  includeSeconds = false;

  constructor(
    fieldNumber: number,
    id: string,
    i18n?: string
  ) {
    super(
      FieldType.DateTime,
      fieldNumber,
      id,
      i18n);

    this.value = new Date(new Date().setSeconds(0));
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
        this.value = moment(value.padEnd(14, '0'), 'YYYYMMDDhhmmss').toDate();
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
      this.value.getDate().toString().padStart(2, '0') +
      this.value.getHours().toString().padStart(2, '0') +
      this.value.getMinutes().toString().padStart(2, '0') +
      (this.includeSeconds ? this.value.getSeconds().toString().padStart(2, '0') : '');
  }
}
