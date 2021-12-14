import { MessageConfigurationService } from 'app/services';
import { DateTimeField } from './datetime.field';
import { MultipleField } from './multiple.field';

export class DrCustomField extends MultipleField {

  private static i18n = 'data-types.dr';

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
        new DateTimeField(1, id + '.1', DrCustomField.i18n + '.1').init({ includeSeconds: true }),
        new DateTimeField(2, id + '.2', DrCustomField.i18n + '.2').init({ includeSeconds: true })
      ],
      i18n,
      level);
  }
}
