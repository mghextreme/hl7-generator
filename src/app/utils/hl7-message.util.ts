import { TranslateService } from '@ngx-translate/core';
import { Al1Section, Dg1Section, EvnSection, ISection, MrgSection, MshSection, Nk1Section, ObrSection, ObxSection, OrcSection, PidSection, Pv1Section, RxeSection, RxrSection, SectionType } from 'app/models';
import { MessageConfigurationService } from 'app/services';

export class Hl7MessageUtils {
  public static parse(
    configService: MessageConfigurationService,
    translate: TranslateService,
    message: string
  ): ISection[] {
    const sections: ISection[] = [];

    const bits = message.split('\n');
    bits.forEach(b => {
      b = b.trim();

      if (b.endsWith('\\r')) {
        b = b.substring(0, b.length - 2);
      }

      try {
        const type = b.substring(0, 3);
        const newSection = this.newSection(configService, translate, type, b);
        if (newSection) {
          sections.push(newSection);
        }
      } catch (err) {
        console.error(err);
      }
    });

    return sections;
  }

  public static newSection(
    configService: MessageConfigurationService,
    translate: TranslateService,
    type: string,
    text: string = ''
  ): ISection {
    switch (type) {
      case SectionType.AL1:
        return new Al1Section(configService, translate, text);
      case SectionType.DG1:
        return new Dg1Section(configService, translate, text);
      case SectionType.EVN:
        return new EvnSection(configService, translate, text);
      case SectionType.MRG:
        return new MrgSection(configService, translate, text);
      case SectionType.MSH:
        return new MshSection(configService, translate, text);
      case SectionType.NK1:
        return new Nk1Section(configService, translate, text);
      case SectionType.OBR:
        return new ObrSection(configService, translate, text);
      case SectionType.OBX:
        return new ObxSection(configService, translate, text);
      case SectionType.ORC:
        return new OrcSection(configService, translate, text);
      case SectionType.PID:
        return new PidSection(configService, translate, text);
      case SectionType.PV1:
        return new Pv1Section(configService, translate, text);
      case SectionType.RXE:
        return new RxeSection(configService, translate, text);
      case SectionType.RXR:
        return new RxrSection(configService, translate, text);
      default:
        return null;
    }
  }
}
