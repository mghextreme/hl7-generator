import { MessageConfigurationService } from 'app/services';
import { DateField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment';

export class PidSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.PID,
      text);
  }

  public generateData(): void {
    this.fields.forEach((f) => f.generate());

    const uniq = faker.datatype.number({ min: 10000, max: 99999 });
    this.getField(2).setValue('ID-' + uniq);
    (this.getField(3) as MultipleField).getField(1).setValue('PID' + uniq);
    this.getField(18).setValue('PAN' + uniq);
  }

  protected setFields(configService: MessageConfigurationService) {
    this.fields = [
      new StringField(2, 'sections.pid.2'),
      new MultipleField(
        configService,
        3,
        'sections.pid.3',
        [
          new StringField(1, 'sections.pid.3.1'),
          new MultipleField(
            configService,
            4,
            'sections.pid.3.4',
            [
              new StringField(1, 'sections.pid.3.4.1', this.configService.retrieve('PID.3.4.1')),
              new StringField(2, 'sections.pid.3.4.2', this.configService.retrieve('PID.3.4.2'))
            ]).init({
              level: 2
            }),
          new MultipleField(
            configService,
            6,
            'sections.pid.3.6',
            [
              new StringField(1, 'sections.pid.3.6.1', this.configService.retrieve('PID.3.6.1')),
              new StringField(2, 'sections.pid.3.6.2', this.configService.retrieve('PID.3.6.2'))
            ]).init({
              level: 2
            })
        ]
      ),
      new MultipleField(
        configService,
        5,
        'sections.pid.5',
        [
          new StringField(1, 'sections.pid.5.1'),
          new StringField(2, 'sections.pid.5.2'),
          new StringField(3, 'sections.pid.5.3'),
          new StringField(4, 'sections.pid.5.4'),
          new StringField(5, 'sections.pid.5.5')
        ]
      ).init({ valueGenerator: (f) => {
        f.setValue([
          faker.name.lastName(),
          faker.name.firstName(),
          faker.datatype.boolean() ? faker.name.firstName() : '',
          faker.datatype.number(8) === 1 ? faker.name.suffix() : ''])
      }}),
      new DateField(7, 'sections.pid.7').init({ valueGenerator: (f) => {
        f.setValue(
          faker.date.past(75, moment().subtract(5, 'year').toDate()))
      }}),
      new StringField(8, 'sections.pid.8').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.8')));
      }}),
      new StringField(10, 'sections.pid.10').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.10')));
      }}),
      new MultipleField(
        configService,
        11,
        'sections.pid.11',
        [
          new StringField(1, 'sections.pid.11.1'),
          new StringField(3, 'sections.pid.11.3'),
          new StringField(4, 'sections.pid.11.4'),
          new StringField(5, 'sections.pid.11.5'),
          new StringField(6, 'sections.pid.11.6')
        ]
      ).init({ valueGenerator: (f) => {
        f.setValue([
          faker.address.streetAddress(), ,
          faker.address.cityName(),
          faker.address.state(),
          faker.address.zipCode()]);
      }}),
      new StringField(16, 'sections.pid.16').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.16')));
      }}),
      new StringField(18, 'sections.pid.18'),
      new StringField(19, 'sections.pid.19').init({ valueGenerator: (f) => {
        f.setValue(faker.finance.routingNumber());
      }}),
      new StringField(22, 'sections.pid.22').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PID.22')));
      }})
    ];
  }
}
