import { MessageConfigurationService } from 'app/services';
import { DateTimeField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment';

export class PV1Section extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.PV1,
      text);
  }

  public generateData(): void {
    this.fields.forEach((f) => f.generate());
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [
      new MultipleField(
        this.configService,
        3,
        'sections.pv1.3',
        [
          new StringField(1, 'sections.pv1.3.1'),
          new StringField(2, 'sections.pv1.3.2'),
          new StringField(3, 'sections.pv1.3.3'),
          new StringField(4, 'sections.pv1.3.4')
        ]
      ),
      new StringField(36, 'sections.pv1.36').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PV1.36')));
      }}),
      new DateTimeField(44, 'sections.pv1.44').init({ valueGenerator: (f) => {
        this.getField(44).setValue(
          faker.date.between(
            moment().subtract(2, 'year').toDate(),
            moment().subtract(1, 'hour').toDate()))
      }}),
      new DateTimeField(45, 'sections.pv1.45').init({ valueGenerator: (f) => {
        const admitField = this.getField(44);
        const admitDate = (admitField as DateTimeField).value ?? moment().subtract(1, 'month').toDate();
        f.setValue(faker.date.between(admitDate, new Date()));
      }})
    ];
  }
}
