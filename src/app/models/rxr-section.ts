import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField } from './ce.custom.field';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class RxrSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.RXR,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new CeCustomField(this.configService, 1, 'rxr.1'),
      new CeCustomField(this.configService, 2, 'rxr.2'),
      new CeCustomField(this.configService, 3, 'rxr.3'),
      new CeCustomField(this.configService, 4, 'rxr.4'),
      new CeCustomField(this.configService, 5, 'rxr.5'),
    ];
  }
}
