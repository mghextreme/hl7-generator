import { MessageConfigurationService } from 'app/services';
import { SectionType } from './section-type.enum';
import { SectionBase } from './section-base';
import { DateTimeField, StringField } from './fields';
import { MultipleField } from './multiple.field';
import faker from 'faker';

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
    this.fields = [
      new StringField(1, 'sections.msh.1').init({
        required: true,
        expanded: true,
        minLength: 1,
        maxLength: 1
      }),
      new MultipleField(
        this.configService,
        2,
        'sections.msh.2',
        [
          new StringField(1, 'sections.msh.2.1').init({ minLength: 1, maxLength: 1 }),
          new StringField(2, 'sections.msh.2.2').init({ minLength: 1, maxLength: 1 }),
          new StringField(3, 'sections.msh.2.3').init({ minLength: 1, maxLength: 1 }),
          new StringField(4, 'sections.msh.2.4').init({ minLength: 1, maxLength: 1 })
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
      new StringField(3, 'sections.msh.3'),
      new StringField(4, 'sections.msh.4'),
      new StringField(5, 'sections.msh.5'),
      new StringField(6, 'sections.msh.6'),
      new DateTimeField(7, 'sections.msh.7').init({
        includeSeconds: true,
        valueGenerator: (f) => {
          f.setValue(new Date());
        }
      }),
      new MultipleField(
        this.configService,
        9,
        'sections.msh.9',
        [
          new StringField(1, 'sections.msh.9.1'),
          new StringField(2, 'sections.msh.9.2')
        ]),
      new StringField(10, 'sections.msh.10').init({ valueGenerator: (f) => {
        f.setValue(faker.datatype.uuid().replace(/-/g, ''));
      }})
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
          result += this.configService.fieldSeparator.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

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
}
