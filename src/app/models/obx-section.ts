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
        'sections.obx.3',
        [
          new StringField(1, 'sections.obx.3.1'),
          new StringField(2, 'sections.obx.3.2')
        ]),
      new StringField(5, 'sections.obx.5')
    ];
  }
}
