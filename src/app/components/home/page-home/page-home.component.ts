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
    console.error('TODO');
  }

  public handleRemoveSection(sectionId: number): void {
    this.sections = this.sections.filter(s => s.id !== sectionId);
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
