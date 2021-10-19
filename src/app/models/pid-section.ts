import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment';

export class PidSection extends SectionBase {

  constructor(
    readonly configService: MessageConfigurationService,
    readonly translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.PID,
      text);
  }

  public generateData(): void {
    this.fields.forEach((f) => f.generate());

    const uniq = faker.datatype.number({ min: 10000, max: 99999 });
    this.getField(2).setValue('PID' + uniq);
    (this.getField(3) as MultipleField).getField(1).setValue('ID-' + uniq);
    this.getField(18).setValue('PAN' + uniq);
  }

  protected setFields(configService: MessageConfigurationService) {
    this.fields = [
      new StringField(2, 'pid.2'),
      new MultipleField(
        configService,
        3,
        'pid.3',
        [
          new StringField(1, 'pid.3.1'),
          new MultipleField(
            configService,
            4,
            'pid.3.4',
            [
              new StringField(1, 'pid.3.4.1', this.configService.retrieve('PID.3.4.1')),
              new StringField(2, 'pid.3.4.2', this.configService.retrieve('PID.3.4.2'))
            ]).init({
              level: 2
            }),
          new MultipleField(
            configService,
            6,
            'pid.3.6',
            [
              new StringField(1, 'pid.3.6.1', this.configService.retrieve('PID.3.6.1')),
              new StringField(2, 'pid.3.6.2', this.configService.retrieve('PID.3.6.2'))
            ]).init({
              level: 2
            })
        ]
      ),
      new MultipleField(
        configService,
        5,
        'pid.5',
        [
          new StringField(1, 'pid.5.1'),
          new StringField(2, 'pid.5.2'),
          new StringField(3, 'pid.5.3'),
          new StringField(4, 'pid.5.4'),
          new StringField(5, 'pid.5.5')
        ]
      ).init({ valueGenerator: (f) => {
        f.setValue([
          faker.name.lastName(),
          faker.name.firstName(),
          faker.datatype.boolean() ? faker.name.firstName() : '',
          faker.datatype.number(8) === 1 ? faker.name.suffix() : ''])
      }}),
      new DateField(7, 'pid.7').init({ valueGenerator: (f) => {
        const tz = configService.timezone;
        f.setValue(
          faker.date.past(75, moment.tz(tz).local(true).subtract(5, 'year').toDate()))
      }}),
      new StringField(8, 'pid.8').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.8')));
      }}),
      new StringField(10, 'pid.10').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.10')));
      }}),
      new MultipleField(
        configService,
        11,
        'pid.11',
        [
          new StringField(1, 'pid.11.1'),
          new StringField(3, 'pid.11.3'),
          new StringField(4, 'pid.11.4'),
          new StringField(5, 'pid.11.5'),
          new StringField(6, 'pid.11.6')
        ]
      ).init({ valueGenerator: (f) => {
        f.setValue([
          faker.address.streetAddress(), ,
          faker.address.cityName(),
          faker.address.state(),
          faker.address.zipCode()]);
      }}),
      new StringField(16, 'pid.16').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.16')));
      }}),
      new StringField(18, 'pid.18'),
      new StringField(19, 'pid.19').init({ valueGenerator: (f) => {
        f.setValue(faker.finance.routingNumber());
      }}),
      new StringField(22, 'pid.22').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.22')));
      }})
    ];
  }
}
