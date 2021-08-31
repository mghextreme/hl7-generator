import { MessageConfigurationService } from 'app/services';
import { IField } from './field.interface';
import { SectionType } from './section-type.enum';

export interface ISection {
  id: number;
  type: SectionType;

  fields: IField[];

  toString(): string;

  parse(text: string): void;
}
