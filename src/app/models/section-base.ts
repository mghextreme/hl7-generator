import { MessageConfigurationService } from 'app/services';
import { TranslateService } from '@ngx-translate/core';
import { IField } from './fields';
import { SectionType } from './section-type.enum';
import { ISection } from './section.interface';
import _ from 'lodash';
import faker from 'faker';

export abstract class SectionBase implements ISection {
  id: string;
  fields: IField[] = [];
  expanded: boolean;

  constructor(
    protected readonly configService: MessageConfigurationService,
    protected readonly translate: TranslateService,
    public readonly type: SectionType,
    text: string = ''
  ) {
    this.id = faker.datatype.uuid();
    this.type = type;
    this.expanded = true;

    this.setFields();

    this.parse(text);
  }

  protected abstract setFields(): void;

  public getField(fieldNumber: number): IField {
    return _.find(this.fields, f => f.fieldNumber === fieldNumber);
  }

  public toString(): string {
    let result = this.type.toString();
    let lastIndex = 0;

    for (const cur of this.fields) {
      if (cur.expanded &&
          cur.hasValue()) {
          result += this.configService.fieldSeparator.repeat(cur.fieldNumber - lastIndex);
          lastIndex = cur.fieldNumber;

          result += cur.toString();
      }
    }

    return result + this.configService.fieldSeparator;
  }

  public parse(text: string): void {
    if (text === null || text.length === 0) {
      return;
    }

    const bits = text.split(this.configService.fieldSeparator);
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
