import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { SectionType } from './section-type.enum';
import { SectionBase } from './section-base';
import { DateTimeField, HdCustomField, MultipleField, NumericField, OptionsField, StringField } from './fields';
import faker from 'faker';
import moment from 'moment-timezone';
import { IOption } from './option.interface';

export class MshSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.MSH,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new StringField(1, 'msh.1').init({
        required: true,
        expanded: true,
        minLength: 1,
        maxLength: 1
      }),
      new MultipleField(
        this.configService,
        2,
        'msh.2',
        [
          new StringField(1, 'msh.2.1').init({ minLength: 1, maxLength: 1 }),
          new StringField(2, 'msh.2.2').init({ minLength: 1, maxLength: 1 }),
          new StringField(3, 'msh.2.3').init({ minLength: 1, maxLength: 1 }),
          new StringField(4, 'msh.2.4').init({ minLength: 1, maxLength: 1 })
        ]).init({
          required: true,
          expanded: true,
          customToString: (field: MultipleField): string => {
            return field.getField(1).toString() +
              field.getField(2).toString() +
              field.getField(3).toString().repeat(2) +
              field.getField(4).toString();
          }
      }),
      new HdCustomField(this.configService, 3, 'msh.3'),
      new HdCustomField(this.configService, 4, 'msh.4'),
      new HdCustomField(this.configService, 5, 'msh.5'),
      new HdCustomField(this.configService, 6, 'msh.6'),
      new DateTimeField(7, 'msh.7').init({
        includeSeconds: true,
        valueGenerator: (f) => {
          f.setValue(moment.tz(this.configService.timezone).local(true).toDate());
        }
      }),
      new MultipleField(
        this.configService,
        9,
        'msh.9',
        [
          new StringField(1, 'msh.9.1'),
          new StringField(2, 'msh.9.2'),
          new StringField(3, 'msh.9.3')
        ]),
      new StringField(10, 'msh.10').init({ valueGenerator: (f) => {
        f.setValue(faker.datatype.uuid().replace(/-/g, ''));
      }}),
      new MultipleField(
        this.configService,
        11,
        'msh.11',
        [
          new OptionsField(this.translate, 1, 'msh.11.1', MshSection.msh_11_1_options).init({ editable: false }),
          new OptionsField(this.translate, 2, 'msh.11.2', MshSection.msh_11_2_options)
        ]),
      new MultipleField(
        this.configService,
        12,
        'msh.12',
        [
          new OptionsField(this.translate, 1, 'msh.12.1', MshSection.msh_12_1_options).init({ editable: false }),
          new StringField(2, 'msh.12.2'),
          new StringField(3, 'msh.12.3')
        ]),
      new NumericField(13, 'msh.13'),
      new StringField(14, 'msh.14'),
      new OptionsField(this.translate, 15, 'msh.15', MshSection.msh_15_options),
      new OptionsField(this.translate, 16, 'msh.16', MshSection.msh_15_options),
    ];
  }

  public toString(): string {
    let result = this.type.toString();
    result += this.configService.fieldSeparator;
    result += this.getField(2).toString();

    let lastIndex = 2;
    for (let i = 2; i < this.fields.length; i++) {
      const cur = this.fields[i];
      if (cur.expanded &&
          cur.hasValue()) {
          result += this.configService.fieldSeparator.repeat(cur.fieldNumber - lastIndex);
          lastIndex = cur.fieldNumber;

          result += cur.toString();
      }
    }

    return result + this.configService.fieldSeparator;
  }

  public parse(text: string): void {
    if (text === null || text.length === 0) {
      this.loadDefaultValues();
      return;
    }

    this.configService.fieldSeparator = text.substring(3, 1);
    this.configService.componentSeparator = text.substring(4, 1);
    this.configService.fieldRepeatSeparator = text.substring(5, 1);
    this.configService.escapeCharacter = text.substring(6, 1);
    this.configService.subComponentSeparator = text.substring(8, 1);

    this.getField(1).setValue(this.configService.fieldSeparator);
    this.getField(2).setValue([
      this.configService.componentSeparator,
      this.configService.fieldRepeatSeparator,
      this.configService.escapeCharacter,
      this.configService.subComponentSeparator
    ]);

    const bits = text.split(this.configService.fieldSeparator);
    for (let i = 2; i < bits.length; i++) {
      const bit = bits[i];
      if (bit.length > 0) {
        const field = this.getField(i + 1);
        if (field) {
          field.setValue(bit);
        }
      }
    }

    this.expanded = false;
  }

  private loadDefaultValues() {
    this.getField(1).setValue(this.configService.fieldSeparator);
    this.getField(2).setValue([
      this.configService.componentSeparator,
      this.configService.fieldRepeatSeparator,
      this.configService.escapeCharacter,
      this.configService.subComponentSeparator
    ]);
    this.getField(3).setValue(this.configService.retrieve('MSH.3'));
    this.getField(5).setValue(this.configService.retrieve('MSH.5'));
    this.getField(7).generate();
    this.getField(10).generate();
  }

  private static msh_11_1_options: IOption[] = [
    { value: 'P', i18n: 'sections.msh.11.1.options.P' },
    { value: 'D', i18n: 'sections.msh.11.1.options.D' },
    { value: 'T', i18n: 'sections.msh.11.1.options.T' }
  ];

  private static msh_11_2_options: IOption[] = [
    { value: '', i18n: 'sections.msh.11.2.options.empty' },
    { value: 'A', i18n: 'sections.msh.11.2.options.A' },
    { value: 'I', i18n: 'sections.msh.11.2.options.I' },
    { value: 'R', i18n: 'sections.msh.11.2.options.R' },
    { value: 'T', i18n: 'sections.msh.11.2.options.T' }
  ];

  private static msh_12_1_options: IOption[] = [
    { value: '2.0', i18n: 'sections.msh.12.1.options.2_0' },
    { value: '2.0D', i18n: 'sections.msh.12.1.options.2_0D' },
    { value: '2.1', i18n: 'sections.msh.12.1.options.2_1' },
    { value: '2.2', i18n: 'sections.msh.12.1.options.2_2' },
    { value: '2.3', i18n: 'sections.msh.12.1.options.2_3' },
    { value: '2.3.1', i18n: 'sections.msh.12.1.options.2_3_1' },
    { value: '2.4', i18n: 'sections.msh.12.1.options.2_4' },
    { value: '2.5', i18n: 'sections.msh.12.1.options.2_5' },
    { value: '2.5.1', i18n: 'sections.msh.12.1.options.2_5_1' },
    { value: '2.6', i18n: 'sections.msh.12.1.options.2_6' },
    { value: '2.7', i18n: 'sections.msh.12.1.options.2_7' },
    { value: '2.7.1', i18n: 'sections.msh.12.1.options.2_7_1' },
    { value: '2.8', i18n: 'sections.msh.12.1.options.2_8' }
  ];

  private static msh_15_options: IOption[] = [
    { value: 'AL', i18n: 'sections.msh.15.options.AL' },
    { value: 'ER', i18n: 'sections.msh.15.options.ER' },
    { value: 'NE', i18n: 'sections.msh.15.options.NE' },
    { value: 'SU', i18n: 'sections.msh.15.options.SU' }
  ];
}
