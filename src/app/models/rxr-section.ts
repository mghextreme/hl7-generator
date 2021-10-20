import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { OptionsField } from './fields';
import { IOption } from './option.interface';
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
      new OptionsField(
        this.translate,
        1,
        'orc.1',
        RxrSection.rxr_1_options)
      ];
  }

  private static rxr_1_options: IOption[] = [
    { value: 'AP', i18n: 'sections.rxr.1.options.AP' },
    { value: 'B', i18n: 'sections.rxr.1.options.B' },
    { value: 'DT', i18n: 'sections.rxr.1.options.DT' },
    { value: 'EP', i18n: 'sections.rxr.1.options.EP' },
    { value: 'ET', i18n: 'sections.rxr.1.options.ET' },
    { value: 'GTT', i18n: 'sections.rxr.1.options.GTT' },
    { value: 'GU', i18n: 'sections.rxr.1.options.GU' },
    { value: 'IA', i18n: 'sections.rxr.1.options.IA' },
    { value: 'IB', i18n: 'sections.rxr.1.options.IB' },
    { value: 'IC', i18n: 'sections.rxr.1.options.IC' },
    { value: 'ICV', i18n: 'sections.rxr.1.options.ICV' },
    { value: 'ID', i18n: 'sections.rxr.1.options.ID' },
    { value: 'IH', i18n: 'sections.rxr.1.options.IH' },
    { value: 'IHA', i18n: 'sections.rxr.1.options.IHA' },
    { value: 'IM', i18n: 'sections.rxr.1.options.IM' },
    { value: 'IMR', i18n: 'sections.rxr.1.options.IMR' },
    { value: 'IN', i18n: 'sections.rxr.1.options.IN' },
    { value: 'IO', i18n: 'sections.rxr.1.options.IO' },
    { value: 'IP', i18n: 'sections.rxr.1.options.IP' },
    { value: 'IS', i18n: 'sections.rxr.1.options.IS' },
    { value: 'IT', i18n: 'sections.rxr.1.options.IT' },
    { value: 'IU', i18n: 'sections.rxr.1.options.IU' },
    { value: 'IV', i18n: 'sections.rxr.1.options.IV' },
    { value: 'MM', i18n: 'sections.rxr.1.options.MM' },
    { value: 'MTH', i18n: 'sections.rxr.1.options.MTH' },
    { value: 'NG', i18n: 'sections.rxr.1.options.NG' },
    { value: 'NP', i18n: 'sections.rxr.1.options.NP' },
    { value: 'NS', i18n: 'sections.rxr.1.options.NS' },
    { value: 'NT', i18n: 'sections.rxr.1.options.NT' },
    { value: 'OP', i18n: 'sections.rxr.1.options.OP' },
    { value: 'OT', i18n: 'sections.rxr.1.options.OT' },
    { value: 'OTH', i18n: 'sections.rxr.1.options.OTH' },
    { value: 'PF', i18n: 'sections.rxr.1.options.PF' },
    { value: 'PO', i18n: 'sections.rxr.1.options.PO' },
    { value: 'PR', i18n: 'sections.rxr.1.options.PR' },
    { value: 'RM', i18n: 'sections.rxr.1.options.RM' },
    { value: 'SC', i18n: 'sections.rxr.1.options.SC' },
    { value: 'SD', i18n: 'sections.rxr.1.options.SD' },
    { value: 'SL', i18n: 'sections.rxr.1.options.SL' },
    { value: 'TD', i18n: 'sections.rxr.1.options.TD' },
    { value: 'TL', i18n: 'sections.rxr.1.options.TL' },
    { value: 'TP', i18n: 'sections.rxr.1.options.TP' },
    { value: 'TRA', i18n: 'sections.rxr.1.options.TRA' },
    { value: 'UR', i18n: 'sections.rxr.1.options.UR' },
    { value: 'VG', i18n: 'sections.rxr.1.options.VG' },
    { value: 'VM', i18n: 'sections.rxr.1.options.VM' },
    { value: 'WND', i18n: 'sections.rxr.1.options.WND' }
  ];
}
