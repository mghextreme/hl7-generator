import { MessageConfigurationService } from 'app/services';
import { IField } from './fields';
import { SectionType } from './section-type.enum';
import { ISection } from './section.interface';

export abstract class SectionBase implements ISection {
  id: number;
  fields: IField[] = [];
  expanded: boolean;

  constructor(
    readonly configService: MessageConfigurationService,
    readonly type: SectionType,
    text: string = ''
  ) {
    this.id = Date.now();
    this.type = type;
    this.expanded = true;

    this.setFields(this.configService);

    this.parse(text);
  }

  protected abstract setFields(configService: MessageConfigurationService): void;

  public toString(): string {
    let result = this.type.toString();
    let lastIndex = 0;

    for (let i = 0; i < this.fields.length; i++) {
      let cur = this.fields[i];
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
    if (text === null || text.length === 0) return;

    let bits = text.split(this.configService.splitChar);
    for (let i = 1; i < bits.length; i++) {
      let bit = bits[i];
      if (bit.length > 0) {
        let fields = this.fields.filter(f => f.number === i);
        fields.forEach(f => {
          f.expanded = true;
          f.setValue(bit);
        });
      }
    }

    this.expanded = false;
  }
}
