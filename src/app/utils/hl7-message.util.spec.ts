import { async, inject, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { SectionType } from 'app/models';
import { MessageConfigurationService } from 'app/services';
import { TranslateLoaderMock } from 'app/testing/translate-loader-mock';
import { Hl7MessageUtils } from './hl7-message.util';

describe('Hl7MessageUtils', () => {

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

  it('new AL1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'AL1');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.AL1);
      expect(newSection.toString()).toEqual('AL1|');
    }
  ));

  it('parse AL1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'AL1|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.AL1);
    }
  ));

  it('new DG1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'DG1');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.DG1);
      expect(newSection.toString()).toEqual('DG1|');
    }
  ));

  it('parse DG1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'DG1|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.DG1);
    }
  ));

  it('new EVN section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'EVN');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.EVN);
      expect(newSection.toString()).toEqual('EVN|');
    }
  ));

  it('parse EVN section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'EVN|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.EVN);
    }
  ));

  it('new MRG section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'MRG');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.MRG);
      expect(newSection.toString()).toEqual('MRG|');
    }
  ));

  it('parse MRG section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'MRG|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.MRG);
    }
  ));

  it('new MSH section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'MSH');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.MSH);
      expect(newSection.toString().startsWith('MSH|')).toBeTruthy();
    }
  ));

  it('parse MSH section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'MSH|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.MSH);
    }
  ));

  it('new NK1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'NK1');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.NK1);
      expect(newSection.toString().startsWith('NK1|')).toBeTruthy();
    }
  ));

  it('parse NK1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'NK1|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.NK1);
    }
  ));

  it('new OBR section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'OBR');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.OBR);
      expect(newSection.toString()).toEqual('OBR|');
    }
  ));

  it('parse OBR section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'OBR|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.OBR);
    }
  ));

  it('new OBX section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'OBX');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.OBX);
      expect(newSection.toString()).toEqual('OBX|');
    }
  ));

  it('parse OBX section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'OBX|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.OBX);
    }
  ));

  it('new ORC section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'ORC');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.ORC);
      expect(newSection.toString()).toEqual('ORC|');
    }
  ));

  it('parse ORC section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'ORC|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.ORC);
    }
  ));

  it('new PID section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'PID');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.PID);
      expect(newSection.toString()).toEqual('PID|');
    }
  ));

  it('parse PID section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'PID|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.PID);
    }
  ));

  it('new PV1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'PV1');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.PV1);
      expect(newSection.toString()).toEqual('PV1|');
    }
  ));

  it('parse PV1 section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'PV1|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.PV1);
    }
  ));

  it('new RXE section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'RXE');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.RXE);
      expect(newSection.toString()).toEqual('RXE|');
    }
  ));

  it('parse RXE section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'RXE|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.RXE);
    }
  ));

  it('new RXR section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const newSection = Hl7MessageUtils.newSection(configService, translate, 'RXR');
      expect(newSection).toBeDefined();
      expect(newSection.type).toEqual(SectionType.RXR);
      expect(newSection.toString()).toEqual('RXR|');
    }
  ));

  it('parse RXR section', inject(
    [MessageConfigurationService, TranslateService],
    (configService: MessageConfigurationService, translate: TranslateService) => {
      const hl7 = Hl7MessageUtils.parse(configService, translate, 'RXR|a sample message|');
      expect(hl7).toBeDefined();
      expect(hl7.length).toEqual(1);

      const section = hl7[0];
      expect(section.type).toEqual(SectionType.RXR);
    }
  ));
});
