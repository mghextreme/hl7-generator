import moment from 'moment';
import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export class DateTimeField implements IField {
  number: number;
  i18n: string;
  type: FieldType;
  expanded: boolean;
  required: boolean;
  value?: Date;

  constructor(
    number: number,
    i18n: string
  ) {
    this.type = FieldType.DateTime;
    this.number = number;
    this.i18n = i18n;
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
      this.value = moment(value.toString().padEnd(14, '0'), 'YYYYMMDDhhmmss').toDate();
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
      this.value.getSeconds().toString().padStart(2, '0');
  }
}
