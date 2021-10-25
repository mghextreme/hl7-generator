import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField, StringField, TqCustomField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class RxeSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.RXE,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new TqCustomField(this.configService, 1, 'rxe.1'),
      new CeCustomField(this.configService, 2, 'rxe.2'),
      new StringField(3, 'rxe.3'),
      new StringField(4, 'rxe.4'),
      new CeCustomField(this.configService, 5, 'rxe.5')
      ];
  }
}
