import { MessageConfigurationService } from 'app/services';
import { MultipleField } from './multiple.field';
import { NumericField } from './numeric.field';
import { StringField } from './string.field';

export class XtnCustomField extends MultipleField {

  private static i18n = 'data-types.xtn';

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
        new StringField(1, id + '.1', '', XtnCustomField.i18n + '.1'),
        new StringField(2, id + '.2', '', XtnCustomField.i18n + '.2'),
        new StringField(3, id + '.3', '', XtnCustomField.i18n + '.3'),
        new StringField(4, id + '.4', '', XtnCustomField.i18n + '.4'),
        new NumericField(5, id + '.5', XtnCustomField.i18n + '.5'),
      ],
      i18n,
      level);
  }
}
