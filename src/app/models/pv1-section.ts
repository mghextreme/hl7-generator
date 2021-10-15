import { MessageConfigurationService } from 'app/services';
import { DateTimeField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment-timezone';

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
        'pv1.3',
        [
          new StringField(1, 'pv1.3.1'),
          new StringField(2, 'pv1.3.2'),
          new StringField(3, 'pv1.3.3'),
          new StringField(4, 'pv1.3.4')
        ]
      ),
      new StringField(36, 'pv1.36').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PV1.36')));
      }}),
      new DateTimeField(44, 'pv1.44').init({ valueGenerator: (f) => {
        const tz = configService.timezone;
        const from = moment.tz(tz).local(true).subtract(2, 'year');
        const to = moment.tz(tz).local(true).subtract(1, 'hour');
        this.getField(44).setValue(faker.date.between(from.toDate(), to.toDate()));
      }}),
      new DateTimeField(45, 'pv1.45').init({ valueGenerator: (f) => {
        const tz = configService.timezone;
        const admitField = this.getField(44);
        const admitDate = (admitField as DateTimeField).value ?? moment.tz(tz).local(true).subtract(1, 'month').toDate();
        f.setValue(faker.date.between(admitDate, moment.tz(tz).local(true).toDate()));
      }})
    ];
  }
}
