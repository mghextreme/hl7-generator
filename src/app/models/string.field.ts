import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export class StringField implements IField {
  number: number;
  i18n: string;
  type: FieldType;
  expanded: boolean;
  required: boolean;
  value?: string;

  minLength?: number;
  maxLength?: number;

  constructor(
    number: number,
    i18n: string,
    readonly defaultValue: string = ''
  ) {
    this.type = FieldType.String;
    this.number = number;
    this.i18n = i18n;

    if (defaultValue !== undefined &&
        defaultValue !== null &&
        defaultValue.length) {
      this.value = this.defaultValue;
    }
  }

  public init(init?: Partial<StringField>): StringField {
    Object.assign(this, init);
    return this;
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null &&
           this.value !== '';
  }

  public setValue(value: any): void {
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
           (this.minLength === undefined || this.value.length > this.minLength) &&
           (this.maxLength === undefined || this.value.length > this.maxLength);
  }
}
