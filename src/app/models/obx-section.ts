import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateTimeField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class ObxSection extends SectionBase {

  constructor(
    readonly configService: MessageConfigurationService,
    readonly translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.OBX,
      text);
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [
      new StringField(1, 'obx.1'),
      new MultipleField(
        this.configService,
        3,
        'obx.3',
        [
          new StringField(1, 'obx.3.1'),
          new StringField(2, 'obx.3.2'),
          new StringField(3, 'obx.3.3')
        ]),
      new StringField(4, 'obx.4'),
      new StringField(5, 'obx.5'),
      new MultipleField(
        this.configService,
        6,
        'obx.6',
        [
          new StringField(1, 'obx.6.1'),
          new StringField(2, 'obx.6.2'),
          new StringField(3, 'obx.6.3')
        ]),
      new StringField(11, 'obx.11'),
      new DateTimeField(14, 'obx.14')
    ];
  }
}
