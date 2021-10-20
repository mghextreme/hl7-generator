import { MessageConfigurationService } from 'app/services';
import { MultipleField } from './multiple.field';
import { StringField } from './string.field';

export class HdCustomField extends MultipleField {

  private static i18n = 'data-types.hd';

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
        new StringField(1, id + '.1', '', HdCustomField.i18n + '.1'),
        new StringField(2, id + '.2', '', HdCustomField.i18n + '.2')
      ],
      i18n,
      level);
  }
}
