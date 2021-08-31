import { IField } from './fields';
import { SectionType } from './section-type.enum';
import { ISection } from './section.interface';

export abstract class SectionBase implements ISection {
  type: SectionType;
  id: number;

  abstract fields: IField[];

  constructor(type: SectionType, text: string = '') {
    this.id = Date.now();
    this.type = type;

    this.parse(text);
  }

  public toString(): string {
    let result = this.type.toString();
    let lastIndex = 0;

    for (let i = 0; i < this.fields.length; i++) {
      let cur = this.fields[i];
      if (cur.expanded &&
          cur.hasValue()) {
          result += '|'.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

          result += cur.toString();
      }
    }

    return result + '|';
  }

  public parse(text: string): void {
    if (text === null || text.length === 0) return;

    let bits = text.split('|');
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
  }
}
