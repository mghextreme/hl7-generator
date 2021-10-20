import { MessageConfigurationService } from 'app/services';
import { MultipleField } from './multiple.field';
import { StringField } from './string.field';

export class XcnCustomField extends MultipleField {

  private static i18n = 'data-types.xcn';

  constructor(
    configService: MessageConfigurationService,
    number: number,
    id: string,
    i18n?: string,
    level = 1
  ) {
    super(
      configService,
      number,
      id,
      [
        new StringField(1, id + '.1', '', XcnCustomField.i18n + '.1'),
        new StringField(2, id + '.2', '', XcnCustomField.i18n + '.2'),
        new StringField(3, id + '.3', '', XcnCustomField.i18n + '.3'),
        new StringField(4, id + '.4', '', XcnCustomField.i18n + '.4'),
        new StringField(5, id + '.5', '', XcnCustomField.i18n + '.5')
      ],
      i18n,
      level);
  }
}
