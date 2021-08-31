import { DateField, IField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class PidSection extends SectionBase {
  fields: IField[] = [
    new StringField(2, 'sections.pid.2.name'),
    new StringField(3, 'sections.pid.3.name'),
    new DateField(7, 'sections.pid.7.name'),
    new StringField(18, 'sections.pid.18.name')
  ];

  constructor(text: string = '') {
    super(SectionType.PID, text);
  }
}
