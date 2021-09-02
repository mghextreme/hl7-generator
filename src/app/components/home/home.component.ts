import { Component, ViewChild } from '@angular/core';
import { Clipboard as MyClipboard } from '@angular/cdk/clipboard';
import { AutoComplete } from 'primeng/autocomplete';
import { FieldSearchResult, ISection, MshSection, ObxSection, PidSection, PV1Section, SectionType } from 'app/models';
import { FieldSearchService, MessageConfigurationService } from 'app/services';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    FieldSearchService
  ]
})
export class HomeComponent {

  sections: ISection[] = [];
  hl7 = '';
  expectedHl7 = '';

  selection: FieldSearchResult;
  filteredItems: FieldSearchResult[];

  @ViewChild('filterBar', { static: false }) filterBar: AutoComplete;

  constructor(
    private readonly configService: MessageConfigurationService,
    private readonly fieldSearch: FieldSearchService,
    private readonly clipboard: MyClipboard,
    readonly translate: TranslateService
  ) {
    this.selection = null;
    this.filteredItems = [];
  }

  public addSection(type: string) {
    switch (type) {
      case SectionType.MSH: this.sections.push(new MshSection(this.configService)); break;
      case SectionType.OBX: this.sections.push(new ObxSection(this.configService)); break;
      case SectionType.PID: this.sections.push(new PidSection(this.configService)); break;
      case SectionType.PV1: this.sections.push(new PV1Section(this.configService)); break;
    }

    this.updateFilter();
    this.generateHl7();
  }

  public parseHl7(): void {
    this.sections = [];

    const bits = this.hl7.split('\n');
    bits.forEach(b => {
      b = b.trim();

      if (b.endsWith('\\r')) {
        b = b.substring(0, b.length - 2);
      }

      try {
        const type = b.substring(0, 3);
        let newSection: ISection;

        switch (type) {
          case SectionType.MSH:
            newSection = new MshSection(this.configService, b);
            break;
          case SectionType.OBX:
            newSection = new ObxSection(this.configService, b);
            break;
          case SectionType.PID:
            newSection = new PidSection(this.configService, b);
            break;
          case SectionType.PV1:
            newSection = new PV1Section(this.configService, b);
            break;
          default: return;
        }

        this.sections.push(newSection);
      }
      catch (err) {
        console.error(err);
      }
    });

    this.updateFilter();
  }

  public copyHl7ToClipboard(): void {
    this.clipboard.copy(this.hl7);
  }

  public handleRemoveSection(sectionId: number): void {
    this.sections = this.sections.filter(s => s.id !== sectionId);
    this.generateHl7();
  }

  public handleChangeSection(): void {
    this.generateHl7();
  }

  private generateHl7(): void {
    this.expectedHl7 = _.join(this.sections.map(s => s.toString() + '\\r'), '\r\n');
    this.hl7 = this.expectedHl7;
  }

  public filterItems(event: any) {
    this.filteredItems = this.fieldSearch.search(event.query);
  }

  public handleSelection(event: FieldSearchResult) {
    this.goTo(event.parentId, event.fieldNumber);
    this.filterBar.writeValue(null);
  }

  public handleFocusHotkey(event: Event) {
    this.filterBar.focusInput();
  }

  private updateFilter() {
    this.fieldSearch.updateFields(this.sections);
  }

  private goTo(parentId: number, fieldNumber: number) {
    const section = _.find(this.sections, s => s.id === parentId);
    if (section) {
      section.expanded = true;
    }
  }

}
