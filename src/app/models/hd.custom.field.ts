import { MessageConfigurationService } from 'app/services';
import { MultipleField } from './multiple.field';
import { StringField } from './string.field';

export class HdCustomField extends MultipleField {

  private static i18n = 'data-types.hd';

  constructor(
    configService: MessageConfigurationService,
    fieldNumber: number,
    id: string,
    i18n?: string,
    level = 1
  ) {
    super(
      configService,
      fieldNumber,
      id,
      [
        new StringField(1, id + '.1', '', HdCustomField.i18n + '.1'),
        new StringField(2, id + '.2', '', HdCustomField.i18n + '.2'),
        new StringField(3, id + '.3', '', HdCustomField.i18n + '.3'),
      ],
      i18n,
      level);
  }
}
