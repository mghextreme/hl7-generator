import { DateTimeField, IField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class PV1Section extends SectionBase {
  fields: IField[] = [
    new StringField(36, 'sections.pv1.36.name'),
    new DateTimeField(44, 'sections.pv1.44.name'),
    new DateTimeField(45, 'sections.pv1.45.name')
  ];

  constructor(text: string = '') {
    super(SectionType.PV1, text);
  }
}
