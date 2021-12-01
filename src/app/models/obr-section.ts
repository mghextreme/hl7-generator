import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateTimeField, EiCustomField, NumericField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class ObrSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.OBR,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new NumericField(1, 'obr.1'),
      new EiCustomField(this.configService, 2, 'obr.2'),
      new EiCustomField(this.configService, 3, 'obr.3'),
      new DateTimeField(7, 'obr.7')
    ];
  }
}
