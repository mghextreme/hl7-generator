import { MessageConfigurationService } from 'app/services';
import { DateTimeField, StringField } from './fields';
import { MultipleField } from './multiple.field';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class ObxSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.OBX,
      text);
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [
      new MultipleField(
        this.configService,
        3,
        'obx.3',
        [
          new StringField(1, 'obx.3.1'),
          new StringField(2, 'obx.3.2'),
          new StringField(3, 'obx.3.3')
        ]),
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
