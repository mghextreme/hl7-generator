import { MessageConfigurationService } from 'app/services';
import { HdCustomField } from './hd.custom.field';
import { MultipleField } from './multiple.field';
import { StringField } from './string.field';

export class CxCustomField extends MultipleField {

  private static i18n = 'data-types.cx';

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
        new StringField(1, id + '.1', '', CxCustomField.i18n + '.1'),
        new HdCustomField(configService, 4, id + '.4', CxCustomField.i18n + '.4', level + 1),
        new HdCustomField(configService, 6, id + '.6', CxCustomField.i18n + '.6', level + 1)
      ],
      i18n,
      level);
  }
}
