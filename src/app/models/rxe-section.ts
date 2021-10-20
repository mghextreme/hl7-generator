import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { CeCustomField, DateTimeField, MultipleField, StringField } from './fields';
import { SectionBase } from './section-base';
import { SectionType } from './section-type.enum';

export class RxeSection extends SectionBase {

  constructor(
    configService: MessageConfigurationService,
    translate: TranslateService,
    text: string = ''
  ) {
    super(
      configService,
      translate,
      SectionType.RXE,
      text);
  }

  protected setFields(): void {
    this.fields = [
      new MultipleField(
        this.configService,
        1,
        'rxe.1',
        [
          new MultipleField(
            this.configService,
            1,
            'rxe.1.1',
            [
              new StringField(1, 'rxe.1.1.1'),
              new StringField(2, 'rxe.1.1.2')
            ]),
          new MultipleField(
            this.configService,
            2,
            'rxe.1.2',
            [
              new StringField(1, 'rxe.1.2.1'),
              new StringField(2, 'rxe.1.2.2')
            ]),
          new StringField(3, 'rxe.1.3'),
          new DateTimeField(4, 'rxe.1.4'),
          new DateTimeField(5, 'rxe.1.5'),
          new StringField(6, 'rxe.1.6'),
          new StringField(7, 'rxe.1.7')
        ]),
      new CeCustomField(this.configService, 2, 'rxe.2'),
      new StringField(3, 'rxe.3'),
      new StringField(4, 'rxe.4'),
      new MultipleField(
        this.configService,
        5,
        'rxe.5',
        [
          new StringField(1, 'rxe.5.1'),
          new StringField(2, 'rxe.5.2'),
          new StringField(3, 'rxe.5.3')
        ])
      ];
  }
}
