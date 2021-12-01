import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';

export class NumericField extends BaseField<NumericField> {
  value?: number = null;

  acceptNegatives = false;
  acceptFractions = false;

  constructor(
    fieldNumber: number,
    id: string,
    i18n?: string
  ) {
    super(
      FieldType.Number,
      fieldNumber,
      id,
      i18n);
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null;
  }

  public setValue(value: any): void {
    if (value === null ||
        value === undefined) {
      value = null;
      return;
    }

    let parsed: number = null;
    if (typeof(value) === 'number') {
      parsed = value;
    } else {
      parsed = Number.parseFloat(value.toString());
    }

    if (this.acceptNegatives || parsed >= 0) {
      if (!this.acceptFractions && !Number.isInteger(parsed)) {
        parsed = Math.floor(parsed);
      }
    } else {
      parsed = null;
    }

    this.value = parsed;

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.value?.toString() ?? '';
  }
}
