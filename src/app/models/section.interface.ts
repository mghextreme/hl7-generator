import { MessageConfigurationService } from 'app/services';
import { IField } from './field.interface';
import { SectionType } from './section-type.enum';

export interface ISection {
  id: number;
  type: SectionType;
  expanded: boolean;

  fields: IField[];

  toString(): string;

  parse(text: string): void;
}
