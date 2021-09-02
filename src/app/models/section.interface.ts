import { IField } from './field.interface';
import { SectionType } from './section-type.enum';

export interface ISection {
  id: number;
  type: SectionType;
  expanded: boolean;

  fields: IField[];

  getField(number: number): IField;

  toString(): string;

  parse(text: string): void;
}
