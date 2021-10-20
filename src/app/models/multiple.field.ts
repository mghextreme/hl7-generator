import _ from 'lodash';
import { MessageConfigurationService } from 'app/services';
import { FieldType } from './field-type.enum';
import { IField } from './field.interface';
import { BaseField } from './base-field';

export class MultipleField extends BaseField<MultipleField> {

  constructor(
    private readonly configService: MessageConfigurationService,
    number: number,
    id: string,
    private subfields: IField[],
    i18n?: string,
    public level = 1
  ) {
    super(
      FieldType.Multiple,
      number,
      id,
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
      const bits = value.split(this.getSplitCharacter());
      this.setValueFromArray(bits);
    } else if (value instanceof Array) {
      this.setValueFromArray(value);
    }

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.customToString(this);
  }

  public customToString = (field: MultipleField): string => {
    let result = '';
    let lastIndex = 1;

    let separator = this.getSplitCharacter();

    for (let i = 0; i < field.subfields.length; i++) {
      const cur = field.subfields[i];
      if (cur.hasValue()) {
          result += separator.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

          result += cur.toString();
      }
    }

    return result;
  }

  private getSplitCharacter(): string {
    switch (this.level) {
      case 2: return this.configService.subComponentSeparator;
      default: return this.configService.componentSeparator;
    }
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
