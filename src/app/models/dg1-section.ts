import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField, DateTimeField, NumericField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class Dg1Section extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.DG1,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new NumericField(1, 'dg1.1').init({ required: true }),
      new CeCustomField(this.configService, 3, 'dg1.3'),
      new StringField(4, 'dg1.4'),
      new DateTimeField(5, 'dg1.5').init({ includeSeconds: true }),
      new StringField(6, 'dg1.6').init({ required: true, maxLength: 2 }),
    ];
  }
}
