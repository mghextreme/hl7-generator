import _ from 'lodash';
import { MessageConfigurationService } from 'app/services';
import { FieldType } from './field-type.enum';
import { IField } from './field.interface';
import { BaseField } from './base-field';

export class MultipleField extends BaseField<MultipleField> {

  constructor(
    private readonly configService: MessageConfigurationService,
    number: number,
    i18n: string,
    private subfields: IField[]
  ) {
    super(
      FieldType.Multiple,
      number,
      i18n);
  }

  public hasValue(): boolean {
    return _.some(this.subfields, f => f.hasValue());
  }

  public getField(number: number): IField {
    return _.find(this.subfields, f => f.number === number);
  }

  public setValue(value: any): void {
    if (value instanceof String || typeof(value) === 'string') {
      const bits = value.split(this.configService.subSplitChar);
      this.setValueFromArray(bits);
    } else if (value instanceof Array) {
      this.setValueFromArray(value);
    }

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    let result = '';
    let lastIndex = 1;

    for (let i = 0; i < this.subfields.length; i++) {
      const cur = this.subfields[i];
      if (cur.hasValue()) {
          result += this.configService.subSplitChar.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

          result += cur.toString();
      }
    }

    return result;
  }

  private setValueFromArray(values: any[]): void {
    for (let i = 0; i < values.length; i++) {
      const field = this.getField(i + 1);
      if (field) {
        field.setValue(values[i]);
      }
    }
  }
}
