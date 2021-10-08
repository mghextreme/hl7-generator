import { MessageConfigurationService } from 'app/services';
import { DateTimeField, StringField } from './fields';
import { MultipleField } from './multiple.field';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class ObrSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.OBR,
      text);
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [
      new MultipleField(
        this.configService,
        3,
        'sections.obr.3',
        [
          new StringField(1, 'sections.obr.3.1'),
          new StringField(2, 'sections.obr.3.2'),
          new StringField(3, 'sections.obr.3.3')
        ]),
      new DateTimeField(7, 'sections.obr.7')
    ];
  }
}
