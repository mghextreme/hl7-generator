import { MessageConfigurationService } from 'app/services';
import { DateTimeField } from './datetime.field';
import { MultipleField } from './multiple.field';
import { NumericField } from './numeric.field';
import { StringField } from './string.field';

export class TqCustomField extends MultipleField {

  private static i18n = 'data-types.tq';

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
        new MultipleField(
          configService,
          1,
          id,
          [
            new NumericField(1, id + '.1.1', TqCustomField.i18n + '.1.1'),
            new StringField(2, id + '.1.2', '', TqCustomField.i18n + '.1.2')
          ],
          TqCustomField.i18n + '.1',
          level + 1),
        new MultipleField(
          configService,
          2,
          id,
          [
            new StringField(1, id + '.2.1', '', TqCustomField.i18n + '.2.1'),
            new StringField(2, id + '.2.1', '', TqCustomField.i18n + '.2.2')
          ],
          TqCustomField.i18n + '.2',
          level + 1),
        new StringField(3, id + '.3', '', TqCustomField.i18n + '.3'),
        new DateTimeField(4, id + '.4', TqCustomField.i18n + '.4').init({ includeSeconds: true }),
        new DateTimeField(5, id + '.5', TqCustomField.i18n + '.5').init({ includeSeconds: true }),
        new StringField(6, id + '.6', '', TqCustomField.i18n + '.6'),
        new StringField(7, id + '.7', '', TqCustomField.i18n + '.7'),
        new NumericField(12, id + '.12', TqCustomField.i18n + '.12'),
      ],
      i18n,
      level);
  }
}
