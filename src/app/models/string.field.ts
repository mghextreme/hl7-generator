import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';

export class StringField extends BaseField<StringField> {
  value?: string;

  minLength?: number;
  maxLength?: number;

  constructor(
    number: number,
    id: string,
    readonly defaultValue: string = '',
    i18n?: string
  ) {
    super(
      FieldType.String,
      number,
      id,
      i18n);

    if (defaultValue !== undefined &&
        defaultValue !== null &&
        defaultValue.length > 0) {
      this.value = this.defaultValue;
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
    return this.isValid() ? this.value : this.defaultValue;
  }

  private isValid(): boolean {
    return this.hasValue() &&
           (this.minLength === undefined || this.value.length >= this.minLength) &&
           (this.maxLength === undefined || this.value.length >= this.maxLength);
  }
}
