import { MessageConfigurationService } from 'app/services';
import { MultipleField } from './multiple.field';
import { StringField } from './string.field';

export class EiCustomField extends MultipleField {

  private static i18n = 'data-types.ei';

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
        new StringField(1, id + '.1', '', EiCustomField.i18n + '.1'),
        new StringField(2, id + '.2', '', EiCustomField.i18n + '.2'),
        new StringField(3, id + '.3', '', EiCustomField.i18n + '.3')
      ],
      i18n,
      level);
  }
}
