import { MessageConfigurationService } from 'app/services';
import { DateField, IField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class PidSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.PID,
      text);
  }

  protected setFields(configService: MessageConfigurationService) {
    this.fields = [
      new StringField(2, 'sections.pid.2.name'),
      new MultipleField(
        configService,
        3,
        'sections.pid.3.name',
        [
          new StringField(1, 'sections.pid.3.1.name'),
          new StringField(4, 'sections.pid.3.4.name'),
          new StringField(6, 'sections.pid.3.6.name')
        ]
      ),
      new DateField(7, 'sections.pid.7.name'),
      new StringField(18, 'sections.pid.18.name')
    ];
  }
}
