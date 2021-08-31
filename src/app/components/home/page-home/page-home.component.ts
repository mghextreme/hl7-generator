import { Component } from '@angular/core';
import { ISection, MshSection, PidSection, SectionType } from 'app/models';

@Component({
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

  sections: ISection[] = [];
  hl7: string = '';
  expectedHl7: string = '';

  public addSection(type: SectionType) {
    switch (type) {
      case SectionType.MSH: this.sections.push(new MshSection()); break;
      case SectionType.PID: this.sections.push(new PidSection()); break;
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
            newSection = new MshSection(b);
            break;
          case SectionType.PID:
            newSection = new PidSection(b);
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
    this.expectedHl7 = '';

    for (let i = 0; i < this.sections.length; i++) {
      this.expectedHl7 += this.sections[i].toString() + '\n';
    }

    this.hl7 = this.expectedHl7;
  }

}
