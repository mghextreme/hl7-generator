import { Component } from '@angular/core';
import { ISection, MshSection, PidSection, PV1Section, SectionType } from 'app/models';
import { MessageConfigurationService } from 'app/services';
import _ from 'lodash';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  sections: ISection[] = [];
  hl7: string = '';
  expectedHl7: string = '';

  constructor(
    private readonly configService: MessageConfigurationService
  ) { }

  public addSection(type: SectionType) {
    switch (type) {
      case SectionType.MSH: this.sections.push(new MshSection(this.configService)); break;
      case SectionType.PID: this.sections.push(new PidSection(this.configService)); break;
      case SectionType.PV1: this.sections.push(new PV1Section(this.configService)); break;
    }

    this.generateHl7();
  }

  public parseHl7(): void {
    this.sections = [];

    const bits = this.hl7.split('\n');
    bits.forEach(b => {
      try {
        let firstPipe = b.indexOf('|');
        let type = b.substring(0, firstPipe);
        let newSection: ISection;

        switch (type) {
          case SectionType.MSH:
            newSection = new MshSection(this.configService, b);
            break;
          case SectionType.PID:
            newSection = new PidSection(this.configService, b);
            break;
          case SectionType.PV1:
            newSection = new PV1Section(this.configService, b);
            break;
        }

        this.sections.push(newSection);
      }
      catch (err) {
        console.error(err);
      }
    });
  }

  public handleRemoveSection(sectionId: number): void {
    this.sections = this.sections.filter(s => s.id !== sectionId);
    this.generateHl7();
  }

  public handleChangeSection(): void {
    this.generateHl7();
  }

  private generateHl7(): void {
    this.expectedHl7 = _.join(this.sections.map(s => s.toString()), '\n');
    this.hl7 = this.expectedHl7;
  }

}
