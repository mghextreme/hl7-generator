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
      new StringField(1, 'sections.msh.1', configService.retrieve('MSH.1')).init({
        required: true,
        expanded: true,
        minLength: 1,
        maxLength: 1
      }),
      new StringField(2, 'sections.msh.2', configService.retrieve('MSH.2')).init({
        required: true,
        expanded: true,
        minLength: 4,
        maxLength: 4
      }),
      new StringField(3, 'sections.msh.3'),
      new StringField(4, 'sections.msh.4'),
      new StringField(5, 'sections.msh.5'),
      new StringField(6, 'sections.msh.6'),
      new DateTimeField(7, 'sections.msh.7'),
      new MultipleField(
        this.configService,
        9,
        'sections.msh.9',
        [
          new StringField(1, 'sections.msh.9.1'),
          new StringField(2, 'sections.msh.9.2')
        ]),
      new StringField(10, 'sections.msh.10')
    ];
  }

  public toString(): string {
    let result = this.type.toString();
    result += this.configService.splitChar;
    result += this.fields[1].toString();

    let lastIndex = 2;
    for (let i = 2; i < this.fields.length; i++) {
      const cur = this.fields[i];
      if (cur.expanded &&
          cur.hasValue()) {
          result += this.configService.splitChar.repeat(cur.number - lastIndex);
          lastIndex = cur.number;

          result += cur.toString();
      }
    }

    return result + this.configService.splitChar;
  }

  public parse(text: string): void {
    if (text === null || text.length === 0) {
      this.loadDefaultValues();
      return;
    }

    const splitChar = text.substring(3, 1);
    const subSplitChar = text.substring(4, 1);

    this.configService.splitChar = splitChar;
    this.configService.subSplitChar = subSplitChar;

    text = text.substring(4);
    const bits = text.split(this.configService.splitChar);
    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      if (bit.length > 0) {
        const field = this.getField(i + 2);
        if (field) {
          field.setValue(bit);
        }
      }
    }

    this.expanded = false;
  }

  private loadDefaultValues() {
    this.getField(1).setValue(this.configService.retrieve('MSH.1'));
    this.getField(2).setValue(this.configService.retrieve('MSH.2'));
    this.getField(3).setValue(this.configService.retrieve('MSH.3'));
    this.getField(5).setValue(this.configService.retrieve('MSH.5'));
    this.getField(7).setValue(new Date());
    this.getField(10).setValue(faker.datatype.uuid().replace(/-/g, ''));
  }
}
