import { MessageConfigurationService } from 'app/services';
import { SectionType } from './section-type.enum';
import { SectionBase } from './section-base';
import { DateTimeField, StringField } from './fields';
import { MultipleField } from './multiple.field';

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
      new StringField(1, 'sections.msh.1.name', '|').init({
        required: true,
        expanded: true,
        minLength: 1,
        maxLength: 1
      }),
      new StringField(2, 'sections.msh.2.name', '^\\&').init({
        required: true,
        expanded: true,
        minLength: 4,
        maxLength: 4
      }),
      new StringField(3, 'sections.msh.3.name'),
      new StringField(4, 'sections.msh.4.name'),
      new StringField(5, 'sections.msh.5.name'),
      new StringField(6, 'sections.msh.6.name'),
      new DateTimeField(7, 'sections.msh.7.name'),
      new MultipleField(
        this.configService,
        9,
        'sections.msh.9.name',
        [ ]),
      new StringField(10, 'sections.msh.10.name')
    ];
  }

  public toString(): string {
    let result = this.type.toString();
    result += this.configService.splitChar;
    result += this.fields[1].toString();

    let lastIndex = 2;
    for (let i = 2; i < this.fields.length; i++) {
      let cur = this.fields[i];
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
    if (text === null || text.length === 0) return;

    const splitChar = text.substring(3, 1);
    const subSplitChar = text.substring(4, 1);

    this.configService.splitChar = splitChar;
    this.configService.subSplitChar = subSplitChar;

    text = text.substring(4);
    let bits = text.split(this.configService.splitChar);
    for (let i = 0; i < bits.length; i++) {
      let bit = bits[i];
      if (bit.length > 0) {
        let fields = this.fields.filter(f => f.number === i + 2);
        fields.forEach(f => {
          f.expanded = true;
          f.setValue(bit);
        });
      }
    }
  }
}
