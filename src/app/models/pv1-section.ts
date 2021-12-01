import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateTimeField, NumericField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment-timezone';
import { PlCustomField } from './pl.custom.field';

export class Pv1Section extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.PV1,
      text);
  }

  public generateData(): void {
    this.fields.forEach((f) => f.generate());
  }

  protected setFields(): void {
    this.fields = [
      new NumericField(1, 'pv1.1'),
      new PlCustomField(this.configService, 3, 'pv1.3'),
      new StringField(36, 'pv1.36').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PV1.36')));
      }}),
      new DateTimeField(44, 'pv1.44').init({ valueGenerator: (f) => {
        const tz = this.configService.timezone;
        const from = moment.tz(tz).local(true).subtract(2, 'year');
        const to = moment.tz(tz).local(true).subtract(1, 'hour');
        this.getField(44).setValue(faker.date.between(from.toDate(), to.toDate()));
      }}),
      new DateTimeField(45, 'pv1.45').init({ valueGenerator: (f) => {
        const tz = this.configService.timezone;
        const admitField = this.getField(44);
        const admitDate = (admitField as DateTimeField).value ?? moment.tz(tz).local(true).subtract(1, 'month').toDate();
        f.setValue(faker.date.between(admitDate, moment.tz(tz).local(true).toDate()));
      }})
    ];
  }
}
