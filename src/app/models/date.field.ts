import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export class DateField implements IField {
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
    this.type = FieldType.Date;
    this.number = number;
    this.i18n = i18n;
    this.value = new Date();
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null;
  }

  public toString(): string {
    return this.value.toString();
  }
}
