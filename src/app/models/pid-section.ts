import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField, CxCustomField, DateTimeField, MultipleField, NumericField, RepeatField, StringField, XadCustomField, XpnCustomField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment';

export class PidSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
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

  protected setFields() {
    this.fields = [
      new NumericField(1, 'pid.1'),
      new CxCustomField(this.configService, 2, 'pid.2'),
      new RepeatField(this.configService, new CxCustomField(this.configService, 3, 'pid.3').init({ required: true })),
      new RepeatField(this.configService, new CxCustomField(this.configService, 4, 'pid.4')),
      new RepeatField(this.configService, new XpnCustomField(this.configService, 5, 'pid.5').init({
        required: true,
        valueGenerator: (f) => {
          f.setValue([
            faker.name.lastName(),
            faker.name.firstName(),
            faker.datatype.boolean() ? faker.name.firstName() : '',
            faker.datatype.number(8) === 1 ? faker.name.suffix() : '']);
        }
      })),
      new RepeatField(this.configService, new XpnCustomField(this.configService, 6, 'pid.6').init({ valueGenerator: (f) => {
        f.setValue([
          faker.name.lastName(),
          faker.name.firstName(1),
          faker.datatype.boolean() ? faker.name.firstName(1) : '',
          faker.datatype.number(8) === 1 ? faker.name.suffix() : '']);
      }})),
      new DateTimeField(7, 'pid.7').init({
        includeSeconds: true,
          valueGenerator: (f) => {
          const tz = this.configService.timezone;
          f.setValue(
            faker.date.past(75, moment.tz(tz).local(true).subtract(5, 'year').toDate()));
        }
      }),
      new StringField(8, 'pid.8').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.8')));
      }}),
      new RepeatField(this.configService, new CeCustomField(this.configService, 10, 'pid.10').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.10')));
      }})),
      new RepeatField(this.configService, new XadCustomField(this.configService, 11, 'pid.11').init({ valueGenerator: (f) => {
        f.setValue([
          faker.address.streetAddress(), ,
          faker.address.cityName(),
          faker.address.state(),
          faker.address.zipCode()]);
      }})),
      new StringField(12, 'pid.12'),
      new CeCustomField(this.configService, 15, 'pid.15'),
      new CeCustomField(this.configService, 16, 'pid.16').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.16')));
      }}),
      new CeCustomField(this.configService, 17, 'pid.17').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.17')));
      }}),
      new CxCustomField(this.configService, 18, 'pid.18'),
      new StringField(19, 'pid.19').init({ valueGenerator: (f) => {
        f.setValue(faker.finance.routingNumber());
      }}),
      new RepeatField(this.configService, new CeCustomField(this.configService, 22, 'pid.22').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.22')));
      }})),
      new StringField(24, 'pid.24').init({ maxLength: 1 }),
      new NumericField(25, 'pid.25'),
    ];
  }
}
