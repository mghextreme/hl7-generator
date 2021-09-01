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
      new StringField(2, 'sections.pid.2'),
      new MultipleField(
        configService,
        3,
        'sections.pid.3',
        [
          new StringField(1, 'sections.pid.3.1'),
          new StringField(4, 'sections.pid.3.4'),
          new StringField(6, 'sections.pid.3.6')
        ]
      ),
      new MultipleField(
        configService,
        5,
        'sections.pid.5',
        [
          new StringField(1, 'sections.pid.5.1'),
          new StringField(2, 'sections.pid.5.2'),
          new StringField(3, 'sections.pid.5.3'),
          new StringField(4, 'sections.pid.5.4'),
          new StringField(5, 'sections.pid.5.5')
        ]
      ),
      new DateField(7, 'sections.pid.7'),
      new StringField(8, 'sections.pid.8'),
      new StringField(10, 'sections.pid.10'),
      new MultipleField(
        configService,
        11,
        'sections.pid.11',
        [
          new StringField(1, 'sections.pid.11.1'),
          new StringField(3, 'sections.pid.11.3'),
          new StringField(4, 'sections.pid.11.4'),
          new StringField(5, 'sections.pid.11.5'),
          new StringField(6, 'sections.pid.11.6')
        ]
      ),
      new StringField(16, 'sections.pid.16'),
      new StringField(18, 'sections.pid.18'),
      new StringField(19, 'sections.pid.19'),
      new StringField(22, 'sections.pid.22')
    ];
  }
}
