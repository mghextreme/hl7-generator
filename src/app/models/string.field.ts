import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export class StringField implements IField {
  number: number;
  i18n: string;
  type: FieldType;
  expanded: boolean;
  required: boolean;
  value?: string;

  constructor(
    number: number,
    i18n: string
  ) {
    this.type = FieldType.String;
    this.number = number;
    this.i18n = i18n;
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null &&
           this.value !== '';
  }

  public setValue(value: any): void {
    this.value = value.toString();
  }

  public toString(): string {
    return this.value;
  }
}
