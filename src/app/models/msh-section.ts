import { MessageConfigurationService } from 'app/services';
import { SectionType } from './section-type.enum';
import { SectionBase } from './section-base';

export class MshSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.MSH,
      text);
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [];
  }
}
