import { SectionType } from './section-type.enum';
import { IField } from './field.interface';
import { SectionBase } from './section-base';

export class MshSection extends SectionBase {
  fields: IField[] = [];

  constructor(text: string = '') {
    super(SectionType.MSH, text);
  }
}
