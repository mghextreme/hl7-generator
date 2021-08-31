import { ISection } from './section.interface';
import { SectionType } from './section-type.enum';
import { IField } from './field.interface';

export class MshSection implements ISection {
  type: SectionType;
  id: number;

  fields: IField[];

  constructor(text: string = '') {
    this.id = Date.now();
    this.type = SectionType.MSH;

    this.parse(text);
  }

  public toString(): string {
    return 'MSH|';
  }

  public parse(text: string): void {
    if (text === null || text.length === 0) return;

    console.error('TODO');
  }
}
