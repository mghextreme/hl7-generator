import { IField } from './field.interface';
import { SectionType } from './section-type.enum';

export interface ISection {
  id: string;
  type: SectionType;
  expanded: boolean;

  fields: IField[];

  getField(fieldNumber: number): IField;

  toString(): string;

  parse(text: string): void;
}
