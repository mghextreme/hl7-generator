import { ISection } from './section.interface';
import { SectionType } from './section-type.enum';

export class PidSection implements ISection {
  type: SectionType;
  id: number;

  constructor(text: string = '') {
    this.id = Date.now();
    this.type = SectionType.PID;

    this.parse(text);
  }

  public toString(): string {
    return 'PID|';
  }

  public parse(text: string): void {
    console.error('TODO');
  }
}
