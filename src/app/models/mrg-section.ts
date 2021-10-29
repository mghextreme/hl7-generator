import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CxCustomField, MultipleField, StringField, XpnCustomField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';

export class MrgSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.MRG,
      text);
  }

  public generateData(): void {
    this.fields.forEach((f) => f.generate());

    const uniq = faker.datatype.number({ min: 10000, max: 99999 });
    this.getField(1).setValue([
      'PID' + uniq, , ,
      this.configService.retrieve('PID.3.4'), ,
      this.configService.retrieve('PID.3.6') ]);
    this.getField(3).setValue('PAN' + uniq);
    this.getField(4).setValue('ID-' + uniq);
  }

  protected setFields() {
    this.fields = [
      new CxCustomField(this.configService, 1, 'mrg.1'),
      new CxCustomField(this.configService, 3, 'mrg.3'),
      new CxCustomField(this.configService, 4, 'mrg.4'),
      new XpnCustomField(this.configService, 7, 'mrg.7').init({ valueGenerator: (f) => {
        f.setValue([
          faker.name.lastName(),
          faker.name.firstName(),
          faker.datatype.boolean() ? faker.name.firstName() : '',
          faker.datatype.number(8) === 1 ? faker.name.suffix() : '']);
      }})
    ];
  }
}
