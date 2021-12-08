import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField } from './ce.custom.field';
import { DateField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class Al1Section extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.AL1,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new CeCustomField(this.configService, 1, 'al1.1').init({ required: true }),
      new CeCustomField(this.configService, 2, 'al1.2'),
      new CeCustomField(this.configService, 3, 'al1.3').init({ required: true }),
      new CeCustomField(this.configService, 4, 'al1.4'),
      new StringField(5, 'al1.5'),
      new DateField(6, 'al1.6'),
    ];
  }
}
