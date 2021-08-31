import { ISection } from './section.interface';
import { SectionType } from './section-type.enum';
import { DateField, IField, StringField } from './fields';

export class PidSection implements ISection {
  type: SectionType;
  id: number;

  fields: IField[] = [
    new StringField(2, 'sections.pid.2.name'),
    new StringField(3, 'sections.pid.3.name'),
    new DateField(7, 'sections.pid.7.name')
  ];

  constructor(text: string = '') {
    this.id = Date.now();
    this.type = SectionType.PID;

    this.parse(text);
  }

  public toString(): string {
    let result = 'PID';
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

    console.error('TODO');
  }
}
