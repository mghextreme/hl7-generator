import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateTimeField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class ObrSection extends SectionBase {

  constructor(
    readonly configService: MessageConfigurationService,
    readonly translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.OBR,
      text);
  }

  protected setFields(configService: MessageConfigurationService): void {
    this.fields = [
      new MultipleField(
        this.configService,
        3,
        'obr.3',
        [
          new StringField(1, 'obr.3.1'),
          new StringField(2, 'obr.3.2'),
          new StringField(3, 'obr.3.3')
        ]),
      new DateTimeField(7, 'obr.7')
    ];
  }
}
