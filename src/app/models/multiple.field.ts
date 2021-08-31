import _ from 'lodash';
import { MessageConfigurationService } from 'app/services';
import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export class MultipleField implements IField {
  number: number;
  i18n: string;
  type: FieldType;
  expanded: boolean;
  required: boolean;

  constructor(
    private readonly configService: MessageConfigurationService,
    number: number,
    i18n: string,
    private subfields: IField[]
  ) {
    this.type = FieldType.Multiple;
    this.number = number;
    this.i18n = i18n;
  }

  public hasValue(): boolean {
    return _.some(this.subfields, f => f.hasValue());
  }

  public setValue(value: any): void {
    if (value instanceof String || typeof(value) === 'string') {

      let bits = value.split(this.configService.subSplitChar);
      for (let i = 1; i < bits.length; i++) {
        let bit = bits[i];
        if (bit.length > 0) {
          let fields = this.subfields.filter(f => f.number === i);
          fields.forEach(f => f.setValue(bit));
        }
      }

    }
  }

  public toString(): string {
    let result = '';
    let lastIndex = 1;

    for (let i = 0; i < this.subfields.length; i++) {
      let cur = this.subfields[i];
      if (cur.hasValue()) {
          result += this.configService.subSplitChar.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

          result += cur.toString();
      }
    }

    return result;
  }
}
