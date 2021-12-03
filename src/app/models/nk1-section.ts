import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField } from './ce.custom.field';
import { DateTimeField } from './datetime.field';
import { DateField, StringField, XadCustomField, XpnCustomField, XtnCustomField } from './fields';
import { NumericField } from './numeric.field';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class Nk1Section extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.NK1,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new NumericField(1, 'nk1.1'),
      new XpnCustomField(this.configService, 2, 'nk1.2'),
      new CeCustomField(this.configService, 3, 'nk1.3'),
      new XadCustomField(this.configService, 4, 'nk1.4'),
      new XtnCustomField(this.configService, 5, 'nk1.5'),
      new DateField(8, 'nk1.8'),
      new DateField(9, 'nk1.9'),
      new StringField(13, 'nk1.13'),
      new CeCustomField(this.configService, 14, 'nk1.14'),
      new StringField(15, 'nk1.15'),
      new DateTimeField(16, 'nk1.16').init({ includeSeconds: true }),
    ];
  }
}
