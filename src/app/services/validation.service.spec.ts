import { async, inject, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'app/testing/translate-loader-mock';
import { Hl7MessageUtils } from 'app/utils';
import { MessageConfigurationService } from './message-configuration.service';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {

  let service: ValidationService;

  const DEFAULT_MSH = 'MSH|^~\\&|||||20211201143040||ADT^A01|9faba2d463104cc8872dc7128675ef32|P|2.8|';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock
          },
        })
      ],
      declarations: [ ],
      providers: [
        MessageConfigurationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new ValidationService(TestBed.inject(TranslateService));
  });

  it('minimum valid message', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, DEFAULT_MSH);
      const errors = service.validateMessage(hl7);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(0);
    })
  );

  it('message empty', () => {
    const errors = service.validateMessage([]);
    expect(errors).toBeDefined();
    expect(errors.length).toEqual(1);

    const error = errors[0];
    expect(error.errorCode).toEqual('message-empty');
    expect(error.sectionId).toBeUndefined();
  });

  it('msh none', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const sections = Hl7MessageUtils.parse(configService, translate, 'AL1|SomeValue||OtherValue|');
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('msh-none');
      expect(error.sectionId).toBeUndefined();
    })
  );

  it('msh multiple', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
${DEFAULT_MSH}`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('msh-multiple');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toBeUndefined();
    })
  );

  it('msh not first', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`AL1|SomeValue||OtherValue|
${DEFAULT_MSH}`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('msh-not-first');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toBeUndefined();
    })
  );

  it('msh.7 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const sections = Hl7MessageUtils.parse(configService, translate, 'MSH|^~\\&|||||||ADT^A01|9faba2d463104cc8872dc7128675ef32|P|2.8|');
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[0].id);
      expect(error.fieldNumber).toEqual(7);
    })
  );

  it('msh.9 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const sections = Hl7MessageUtils.parse(
        configService,
        translate,
        'MSH|^~\\&|||||20211201143040|||9faba2d463104cc8872dc7128675ef32|P|2.8|');
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[0].id);
      expect(error.fieldNumber).toEqual(9);
    })
  );

  it('msh.10 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const sections = Hl7MessageUtils.parse(configService, translate, 'MSH|^~\\&|||||20211201143040||ADT^A01||P|2.8|');
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[0].id);
      expect(error.fieldNumber).toEqual(10);
    })
  );

  it('msh.11 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const sections = Hl7MessageUtils.parse(
        configService,
        translate,
        'MSH|^~\\&|||||20211201143040||ADT^A01|9faba2d463104cc8872dc7128675ef32||2.8|');
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[0].id);
      expect(error.fieldNumber).toEqual(11);
    })
  );

  it('msh.12 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const sections = Hl7MessageUtils.parse(
        configService,
        translate,
        'MSH|^~\\&|||||20211201143040||ADT^A01|9faba2d463104cc8872dc7128675ef32|P||');
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[0].id);
      expect(error.fieldNumber).toEqual(12);
    })
  );

  it('mrg.1 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
MRG|`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toEqual(1);
    })
  );

  it('obx.3 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
OBX|||||||||||SomeValue|`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toEqual(3);
    })
  );

  it('obx.11 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
OBX|||SomeValue|`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toEqual(11);
    })
  );

  it('orc.1 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
ORC|`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toEqual(1);
    })
  );

  it('pid.3 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
PID|||||Bond^James|`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toEqual(3);
    })
  );

  it('pid.5 required', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 =
`${DEFAULT_MSH}
PID|||PID_123|`;
      const sections = Hl7MessageUtils.parse(configService, translate, hl7);
      const errors = service.validateMessage(sections);
      expect(errors).toBeDefined();
      expect(errors.length).toEqual(1);

      const error = errors[0];
      expect(error.errorCode).toEqual('field-required');
      expect(error.sectionId).toEqual(sections[1].id);
      expect(error.fieldNumber).toEqual(5);
    })
  );
});
