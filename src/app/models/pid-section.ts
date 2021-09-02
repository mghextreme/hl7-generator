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
    const uniq = faker.datatype.number({ min: 10000, max: 99999 });
    this.getField(2).setValue('ID-' + uniq);
    this.getField(3).setValue([
      'PID' + uniq, , ,
      this.configService.retrieve('PID.3.4'), ,
      this.configService.retrieve('PID.3.6') ]);
    this.getField(5).setValue([
      faker.name.lastName(),
      faker.name.firstName(),
      faker.datatype.boolean() ? faker.name.firstName() : '',
      faker.datatype.number(8) === 1 ? faker.name.suffix() : '']);
    this.getField(7).setValue(
      faker.date.past(75, moment().subtract(5, 'year').toDate()));
    this.getField(8).setValue(
      faker.random.arrayElement(
        this.configService.retrieveCollection('PID.8')));
    this.getField(10).setValue(
      faker.random.arrayElement(
        this.configService.retrieveCollection('PID.10')));
    this.getField(11).setValue([
      faker.address.streetAddress(), ,
      faker.address.cityName(),
      faker.address.state(),
      faker.address.zipCode()]);
    this.getField(16).setValue(
      faker.random.arrayElement(
        this.configService.retrieveCollection('PID.16')));
    this.getField(18).setValue('PAN' + uniq);
    this.getField(19).setValue(faker.finance.routingNumber());
    this.getField(22).setValue(
      faker.random.arrayElement(
        this.configService.retrieveCollection('PID.22')));
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
          new StringField(4, 'sections.pid.3.4'),
          new StringField(6, 'sections.pid.3.6')
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
      ),
      new DateField(7, 'sections.pid.7'),
      new StringField(8, 'sections.pid.8'),
      new StringField(10, 'sections.pid.10'),
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
      ),
      new StringField(16, 'sections.pid.16'),
      new StringField(18, 'sections.pid.18'),
      new StringField(19, 'sections.pid.19'),
      new StringField(22, 'sections.pid.22')
    ];
  }
}
