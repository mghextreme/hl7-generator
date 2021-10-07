import { MessageConfigurationService } from 'app/services';
import { MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';
import faker from 'faker';

export class MrgSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    text: string = ''
  ) {
    super(
      configService,
      SectionType.MRG,
      text);
  }

  public generateData(): void {
    this.fields.forEach((f) => f.generate());

    const uniq = faker.datatype.number({ min: 10000, max: 99999 });
    this.getField(1).setValue([
      'PID' + uniq, , ,
      this.configService.retrieve('PID.3.4'), ,
      this.configService.retrieve('PID.3.6') ]);
    this.getField(3).setValue('PAN' + uniq);
    this.getField(4).setValue('ID-' + uniq);
  }

  protected setFields(configService: MessageConfigurationService) {
    this.fields = [
      new MultipleField(
        configService,
        1,
        'sections.mrg.1',
        [
          new StringField(1, 'sections.mrg.1.1'),
          new StringField(4, 'sections.mrg.1.4', this.configService.retrieve('PID.3.4')),
          new StringField(6, 'sections.mrg.1.6', this.configService.retrieve('PID.3.4'))
        ]
      ),
      new StringField(3, 'sections.mrg.3'),
      new StringField(4, 'sections.mrg.4'),
      new MultipleField(
        configService,
        7,
        'sections.mrg.7',
        [
          new StringField(1, 'sections.mrg.7.1'),
          new StringField(2, 'sections.mrg.7.2'),
          new StringField(3, 'sections.mrg.7.3'),
          new StringField(4, 'sections.mrg.7.4'),
          new StringField(5, 'sections.mrg.7.5')
        ]
      ).init({ valueGenerator: (f) => {
        f.setValue([
          faker.name.lastName(),
          faker.name.firstName(),
          faker.datatype.boolean() ? faker.name.firstName() : '',
          faker.datatype.number(8) === 1 ? faker.name.suffix() : ''])
      }})
    ];
  }
}