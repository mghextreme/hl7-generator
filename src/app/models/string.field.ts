import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';

export class StringField extends BaseField<StringField> {
  value?: string;

  minLength?: number;
  maxLength?: number;

  constructor(
    fieldNumber: number,
    id: string,
    readonly defaultValue: string = '',
    i18n?: string
  ) {
    super(
      FieldType.String,
      fieldNumber,
      id,
      i18n);

    if (defaultValue !== undefined &&
        defaultValue !== null &&
        defaultValue.length > 0) {
      this.value = this.defaultValue;
    } else {
      this.value = '';
    }
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null &&
           this.value !== '';
  }

  public setValue(value: any): void {
    if (value === null ||
        value === undefined) {
      value = '';
    }

    this.value = value.toString();

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.value;
  }
}
