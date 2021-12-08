import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { DateTimeField, EiCustomField, OptionsField, PlCustomField, TqCustomField, XcnCustomField } from './fields';
import { IOption } from './option.interface';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class OrcSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.ORC,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new OptionsField(this.translate, 1, 'orc.1', OrcSection.orc_1_options).init({ required: true }),
      new EiCustomField(this.configService, 2, 'orc.2'),
      new EiCustomField(this.configService, 3, 'orc.3'),
      new OptionsField(this.translate, 5, 'orc.5', OrcSection.orc_5_options),
      new OptionsField(this.translate, 6, 'orc.6', OrcSection.orc_6_options).init({ editable: false }),
      new TqCustomField(this.configService, 7, 'orc.7'),
      new DateTimeField(9, 'orc.9').init({ includeSeconds: true }),
      new XcnCustomField(this.configService, 12, 'orc.12'),
      new PlCustomField(this.configService, 13, 'orc.13'),
      new DateTimeField(15, 'orc.15')
    ];
  }

  private static orc_1_options: IOption[] = [
    { value: 'AF', i18n: 'sections.orc.1.options.AF' },
    { value: 'CA', i18n: 'sections.orc.1.options.CA' },
    { value: 'CH', i18n: 'sections.orc.1.options.CH' },
    { value: 'CN', i18n: 'sections.orc.1.options.CN' },
    { value: 'CR', i18n: 'sections.orc.1.options.CR' },
    { value: 'DC', i18n: 'sections.orc.1.options.DC' },
    { value: 'DE', i18n: 'sections.orc.1.options.DE' },
    { value: 'DF', i18n: 'sections.orc.1.options.DF' },
    { value: 'DR', i18n: 'sections.orc.1.options.DR' },
    { value: 'FU', i18n: 'sections.orc.1.options.FU' },
    { value: 'HD', i18n: 'sections.orc.1.options.HD' },
    { value: 'HR', i18n: 'sections.orc.1.options.HR' },
    { value: 'LI', i18n: 'sections.orc.1.options.LI' },
    { value: 'NA', i18n: 'sections.orc.1.options.NA' },
    { value: 'NW', i18n: 'sections.orc.1.options.NW' },
    { value: 'OC', i18n: 'sections.orc.1.options.OC' },
    { value: 'OD', i18n: 'sections.orc.1.options.OD' },
    { value: 'OE', i18n: 'sections.orc.1.options.OE' },
    { value: 'OF', i18n: 'sections.orc.1.options.OF' },
    { value: 'OH', i18n: 'sections.orc.1.options.OH' },
    { value: 'OK', i18n: 'sections.orc.1.options.OK' },
    { value: 'OR', i18n: 'sections.orc.1.options.OR' },
    { value: 'PA', i18n: 'sections.orc.1.options.PA' },
    { value: 'PR', i18n: 'sections.orc.1.options.PR' },
    { value: 'RE', i18n: 'sections.orc.1.options.RE' },
    { value: 'RF', i18n: 'sections.orc.1.options.RF' },
    { value: 'RL', i18n: 'sections.orc.1.options.RL' },
    { value: 'RO', i18n: 'sections.orc.1.options.RO' },
    { value: 'RP', i18n: 'sections.orc.1.options.RP' },
    { value: 'RQ', i18n: 'sections.orc.1.options.RQ' },
    { value: 'RR', i18n: 'sections.orc.1.options.RR' },
    { value: 'RU', i18n: 'sections.orc.1.options.RU' },
    { value: 'SC', i18n: 'sections.orc.1.options.SC' },
    { value: 'SN', i18n: 'sections.orc.1.options.SN' },
    { value: 'SR', i18n: 'sections.orc.1.options.SR' },
    { value: 'SS', i18n: 'sections.orc.1.options.SS' },
    { value: 'UA', i18n: 'sections.orc.1.options.UA' },
    { value: 'UC', i18n: 'sections.orc.1.options.UC' },
    { value: 'UD', i18n: 'sections.orc.1.options.UD' },
    { value: 'UF', i18n: 'sections.orc.1.options.UF' },
    { value: 'UH', i18n: 'sections.orc.1.options.UH' },
    { value: 'UM', i18n: 'sections.orc.1.options.UM' },
    { value: 'UN', i18n: 'sections.orc.1.options.UN' },
    { value: 'UR', i18n: 'sections.orc.1.options.UR' },
    { value: 'UX', i18n: 'sections.orc.1.options.UX' },
    { value: 'XO', i18n: 'sections.orc.1.options.XO' },
    { value: 'XR', i18n: 'sections.orc.1.options.XR' },
    { value: 'XX', i18n: 'sections.orc.1.options.XX' }
  ];

  private static orc_5_options: IOption[] = [
    { value: 'A', i18n: 'sections.orc.5.options.A' },
    { value: 'CA', i18n: 'sections.orc.5.options.CA' },
    { value: 'CM', i18n: 'sections.orc.5.options.CM' },
    { value: 'DC', i18n: 'sections.orc.5.options.DC' },
    { value: 'ER', i18n: 'sections.orc.5.options.ER' },
    { value: 'HD', i18n: 'sections.orc.5.options.HD' },
    { value: 'IP', i18n: 'sections.orc.5.options.IP' },
    { value: 'RP', i18n: 'sections.orc.5.options.RP' },
    { value: 'SC', i18n: 'sections.orc.5.options.SC' },
  ];

  private static orc_6_options: IOption[] = [
    { value: 'D', i18n: 'sections.orc.6.options.D' },
    { value: 'E', i18n: 'sections.orc.6.options.E' },
    { value: 'F', i18n: 'sections.orc.6.options.F' },
    { value: 'N', i18n: 'sections.orc.6.options.N' },
    { value: 'R', i18n: 'sections.orc.6.options.R' },
  ];
}
