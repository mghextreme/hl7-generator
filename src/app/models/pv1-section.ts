import { MessageConfigurationService } from 'app/services';
import { DateTimeField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class PV1Section extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.PV1,
      text);
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [
      new MultipleField(
        this.configService,
        3,
        'sections.pv1.3',
        [
          new StringField(1, 'sections.pv1.3.1'),
          new StringField(2, 'sections.pv1.3.2'),
          new StringField(3, 'sections.pv1.3.3'),
          new StringField(4, 'sections.pv1.3.4')
        ]
      ),
      new StringField(36, 'sections.pv1.36'),
      new DateTimeField(44, 'sections.pv1.44'),
      new DateTimeField(45, 'sections.pv1.45')
    ];
  }
}
