import { SectionType } from './section-type.enum';

export interface ISection {
  id: number;
  type: SectionType;

  toString(): string;
  parse(text: string): void;
}
