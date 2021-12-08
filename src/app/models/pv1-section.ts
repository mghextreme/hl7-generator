import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateTimeField, NumericField, RepeatField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';
import moment from 'moment-timezone';
import { PlCustomField } from './pl.custom.field';
import { XcnCustomField } from './xcn.custom.field';
import { OptionsField } from './options.field';
import { IOption } from './option.interface';
import { CxCustomField } from './cx.custom.field';
import { CeCustomField } from './ce.custom.field';

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
      new StringField(2, 'pv1.2').init({ required: true, maxLength: 1 }),
      new PlCustomField(this.configService, 3, 'pv1.3'),
      new RepeatField(this.configService, new XcnCustomField(this.configService, 7, 'pv1.7')),
      new OptionsField(this.translate, 10, 'pv1.10', Pv1Section.pv1_10_options),
      new StringField(14, 'pv1.14'),
      new RepeatField(this.configService, new StringField(15, 'pv1.15')),
      new CxCustomField(this.configService, 19, 'pv1.19'),
      new StringField(36, 'pv1.36').init({ valueGenerator: (f) => {
        f.setValue(
          faker.random.arrayElement(
            this.configService.retrieveCollection('PV1.36')));
      }}),
      new CeCustomField(this.configService, 38, 'pv1.38'),
      new DateTimeField(44, 'pv1.44').init({
        includeSeconds: true,
        valueGenerator: (f) => {
          const tz = this.configService.timezone;
          const from = moment.tz(tz).local(true).subtract(2, 'year');
          const to = moment.tz(tz).local(true).subtract(1, 'hour');
          this.getField(44).setValue(faker.date.between(from.toDate(), to.toDate()));
        }
      }),
      new RepeatField(this.configService, new DateTimeField(45, 'pv1.45').init({
        includeSeconds: true,
        valueGenerator: (f) => {
          const tz = this.configService.timezone;
          const admitField = this.getField(44);
          const admitDate = (admitField as DateTimeField).value ?? moment.tz(tz).local(true).subtract(1, 'month').toDate();
          f.setValue(faker.date.between(admitDate, moment.tz(tz).local(true).toDate()));
        }
      }))
    ];
  }

  private static pv1_10_options: IOption[] = [
    { value: 'CAR', i18n: 'sections.pv1.10.options.CAR' },
    { value: 'MED', i18n: 'sections.pv1.10.options.MED' },
    { value: 'PUL', i18n: 'sections.pv1.10.options.PUL' },
    { value: 'SUR', i18n: 'sections.pv1.10.options.SUR' },
    { value: 'URO', i18n: 'sections.pv1.10.options.URO' }
  ];
}
