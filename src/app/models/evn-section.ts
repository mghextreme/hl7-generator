import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import moment from 'moment';
import { DateTimeField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class EvnSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.EVN,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new StringField(1, 'evn.1').init({ maxLength: 3 }),
      new DateTimeField(2, 'evn.2').init({
        required: true,
        includeSeconds: true,
        valueGenerator: (f) => {
          f.setValue(moment.tz(this.configService.timezone).local(true).toDate());
        }
      }),
      new DateTimeField(6, 'evn.6').init({
        includeSeconds: true,
        valueGenerator: (f) => {
          f.setValue(moment.tz(this.configService.timezone).local(true).toDate());
        }
      }),
    ];
  }
}
