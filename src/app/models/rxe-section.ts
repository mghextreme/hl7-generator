import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField, NumericField, RepeatField, TqCustomField, XcnCustomField } from './fields';
import { IOption } from './option.interface';
import { OptionsField } from './options.field';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import { StringField } from './string.field';

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
      new TqCustomField(this.configService, 1, 'rxe.1').init({ required: true }),
      new CeCustomField(this.configService, 2, 'rxe.2').init({ required: true }),
      new NumericField(3, 'rxe.3').init({ required: true }),
      new NumericField(4, 'rxe.4'),
      new CeCustomField(this.configService, 5, 'rxe.5').init({ required: true }),
      new RepeatField(this.configService, new CeCustomField(this.configService, 7, 'rxe.7')),
      new RepeatField(this.configService, new XcnCustomField(this.configService, 14, 'rxe.14')),
      new OptionsField(this.translate, 20, 'rxe.20', RxeSection.rxe_20_options),
      new StringField(23, 'rxe.23').init({ maxLength: 6 }),
      new CeCustomField(this.configService, 24, 'rxe.24'),
      new RepeatField(this.configService, new CeCustomField(this.configService, 27, 'rxe.27'))
    ];
  }

  private static rxe_20_options: IOption[] = [
    { value: 'Y', i18n: 'sections.rxe.20.options.Y' },
    { value: 'N', i18n: 'sections.rxe.20.options.N' },
  ];
}
