import { MessageConfigurationService } from 'app/services';
import { DateTimeField, IField, StringField } from './fields';
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
      new StringField(36, 'sections.pv1.36.name'),
      new DateTimeField(44, 'sections.pv1.44.name'),
      new DateTimeField(45, 'sections.pv1.45.name')
    ];
  }
}
