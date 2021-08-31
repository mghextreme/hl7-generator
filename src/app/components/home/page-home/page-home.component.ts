import { Component } from '@angular/core';
import { ISection, PidSection, SectionType } from 'app/models';

@Component({
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

  sections: ISection[] = [];
  hl7: string = '';
  expectedHl7: string = '';

  addSection(type: SectionType) {
    switch (type) {
      case SectionType.PID: this.sections.push(new PidSection()); break;
    }

    this.generateHl7();
  }

  generateHl7(): void {
    this.expectedHl7 = '';

    for (let i = 0; i < this.sections.length; i++) {
      this.expectedHl7 += this.sections[i].toString() + '\n';
    }

    this.hl7 = this.expectedHl7;
  }

  parseHl7(): void {
    console.error('TODO');
  }

}
