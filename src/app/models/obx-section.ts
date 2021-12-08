import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField, DateTimeField, NumericField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class ObxSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.OBX,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new NumericField(1, 'obx.1'),
      new StringField(2, 'obx.2'),
      new CeCustomField(this.configService, 3, 'obx.3').init({ required: true }),
      new StringField(4, 'obx.4'),
      new StringField(5, 'obx.5'),
      new CeCustomField(this.configService, 6, 'obx.6'),
      new StringField(11, 'obx.11'),
      new DateTimeField(14, 'obx.14').init({ includeSeconds: true })
    ];
  }
}
