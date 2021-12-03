import { MessageConfigurationService } from 'app/services';
import { MultipleField } from './multiple.field';
import { StringField } from './string.field';

export class XadCustomField extends MultipleField {

  private static i18n = 'data-types.xad';

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
        new StringField(1, id + '.1', '', XadCustomField.i18n + '.1'),
        new StringField(3, id + '.3', '', XadCustomField.i18n + '.3'),
        new StringField(4, id + '.4', '', XadCustomField.i18n + '.4'),
        new StringField(5, id + '.5', '', XadCustomField.i18n + '.5'),
        new StringField(6, id + '.6', '', XadCustomField.i18n + '.6'),
        new StringField(7, id + '.7', '', XadCustomField.i18n + '.7')
      ],
      i18n,
      level);
  }
}
