import { MessageConfigurationService } from 'app/services';
import { IField } from './fields';
import { SectionType } from './section-type.enum';
import { ISection } from './section.interface';
import _ from 'lodash';

export abstract class SectionBase implements ISection {
  id: number;
  fields: IField[] = [];
  expanded: boolean;

  constructor(
    protected readonly configService: MessageConfigurationService,
    public readonly type: SectionType,
    text: string = ''
  ) {
    this.id = Date.now();
    this.type = type;
    this.expanded = true;

    this.setFields(this.configService);

    this.parse(text);
  }

  protected abstract setFields(configService: MessageConfigurationService): void;

  public getField(number: number): IField {
    return _.find(this.fields, f => f.number === number);
  }

  public toString(): string {
    let result = this.type.toString();
    let lastIndex = 0;

    for (let i = 0; i < this.fields.length; i++) {
      const cur = this.fields[i];
      if (cur.expanded &&
          cur.hasValue()) {
          result += this.configService.splitChar.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

          result += cur.toString();
      }
    }

    return result + this.configService.splitChar;
  }

  public parse(text: string): void {
    if (text === null || text.length === 0) {
      return;
    }

    const bits = text.split(this.configService.splitChar);
    for (let i = 1; i < bits.length; i++) {
      const bit = bits[i];
      if (bit.length > 0) {
        const field = this.getField(i);
        if (field) {
          field.setValue(bit);
        }
      }
    }

    this.expanded = false;
  }
}
