import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Clipboard as MyClipboard } from '@angular/cdk/clipboard';
import { AutoComplete } from 'primeng/autocomplete';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldSearchResult, ISection, IValidationError, MrgSection, MshSection, ObrSection, ObxSection, PidSection, PV1Section, SectionType, Template } from 'app/models';
import { FieldSearchService, MessageConfigurationService,TemplateService, ValidationService } from 'app/services';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { EditTemplate } from '../edit-template/edit-template.component';
import { ValidationErrorsTemplate } from '../validation-errors-template/validation-errors-template.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    FieldSearchService
  ]
})
export class HomeComponent implements OnDestroy {

  sections: ISection[] = [];
  hl7 = '';
  expectedHl7 = '';

  selection: FieldSearchResult;
  filteredItems: FieldSearchResult[];

  validationErrors: IValidationError[];

  templates: Template[];
  ref: DynamicDialogRef;

  @ViewChild('filterBar', { static: false }) filterBar: AutoComplete;
  @ViewChild('sectionsPanel', { static: false }) sectionsPanel: ElementRef;

  constructor(
    private readonly configService: MessageConfigurationService,
    private readonly fieldSearch: FieldSearchService,
    private readonly clipboard: MyClipboard,
    private readonly dialogService: DialogService,
    private readonly templateService: TemplateService,
    private readonly validationService: ValidationService,
    readonly translate: TranslateService
  ) {
    this.selection = null;
    this.filteredItems = [];
    this.validationErrors = [];

    this.refreshTemplates();
    this.runValidation();
  }

  public addSection(type: string) {
    switch (type) {
      case SectionType.MRG: this.sections.push(new MrgSection(this.configService)); break;
      case SectionType.MSH: this.sections.push(new MshSection(this.configService)); break;
      case SectionType.OBR: this.sections.push(new ObrSection(this.configService)); break;
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
          case SectionType.MRG:
            newSection = new MrgSection(this.configService, b);
            break;
          case SectionType.MSH:
            newSection = new MshSection(this.configService, b);
            break;
          case SectionType.OBR:
            newSection = new ObrSection(this.configService, b);
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
    this.runValidation();
  }

  public copyHl7ToClipboard(): void {
    this.clipboard.copy(this.hl7);
  }

  public handleRemoveSection(sectionId: string): void {
    this.sections = this.sections.filter(s => s.id !== sectionId);
    this.generateHl7();
  }

  public handleChangeSection(): void {
    this.generateHl7();
  }

  private generateHl7(): void {
    this.expectedHl7 = _.join(this.sections.map(s => s.toString() + this.configService.escapeCharacter + 'r'), '\r\n');
    this.hl7 = this.expectedHl7;

    this.runValidation();
  }

  public collapseAllSections(): void {
    this.sections.forEach(x => x.expanded = false);
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

  public saveAsTemplate() {
    this.ref = this.dialogService.open(EditTemplate, {
      header: this.translate.instant('templates.add'),
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto', 'padding': '0' },
      data: {
        isNew: true,
        hl7: this.hl7
      }
    });

    this.ref.onClose.subscribe(() => {
      this.refreshTemplates();
    });
  }

  public editTemplate(template: Template) {
    this.ref = this.dialogService.open(EditTemplate, {
      header: this.translate.instant('templates.edit'),
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto', 'padding': '0' },
      data: {
        isNew: false,
        title: template.title,
        hl7: template.content
      }
    });

    this.ref.onClose.subscribe(() => {
      this.refreshTemplates();
    });
  }

  public deleteTemplate(template: Template) {
    this.templateService.delete(template.title);
    this.refreshTemplates();
  }

  public loadTemplate(template: Template) {
    this.hl7 = template.content;
    this.expectedHl7 = this.hl7;
    this.parseHl7();
  }

  public runValidation(): void {
    this.validationErrors = this.validationService.validateMessage(this.sections);
  }

  public openValidationDetails(): void {
    this.ref = this.dialogService.open(ValidationErrorsTemplate, {
      header: this.translate.instant('validation.window-title'),
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto', 'padding': '0' },
      data: {
        errors: this.validationErrors
      }
    });

    this.ref.onClose.subscribe(() => {
      this.refreshTemplates();
    });
  }

  private refreshTemplates(): void {
    this.templates = this.templateService.getAll();
  }

  private updateFilter() {
    this.fieldSearch.updateFields(this.sections);
  }

  private goTo(parentId: string, fieldNumber: number) {
    const section = _.find(this.sections, s => s.id === parentId);
    if (section) {
      section.expanded = true;
      const field = section.getField(fieldNumber);
      field.expanded = true;

      setTimeout(() => this.scrollTo(parentId, field.number), 100);
      setTimeout(() => this.focusInto(parentId, field.id), 150);
    }
  }

  private scrollTo(parentId: string, fieldNumber: number) {
    const sectionEl = document.querySelector(`.pid-section[data-section-id='${parentId}']`);
    const fieldEl = sectionEl.querySelector(`.field[data-field-number='${fieldNumber}']`);

    const fieldPos = (fieldEl as any).offsetTop;
    this.sectionsPanel.nativeElement.scrollTop = fieldPos - 20;
  }

  private focusInto(parentId: string, fieldId: string): void {
    const sectionEl = document.querySelector(`.pid-section[data-section-id='${parentId}']`);
    const fieldEl = sectionEl.querySelector(`.field-input[data-field-id='${fieldId}']`);
    const focusTarget = fieldEl.querySelector('.focus-target') as HTMLElement;
    if (focusTarget.tagName.toLowerCase() === 'input') {
      focusTarget.focus();
    } else {
      focusTarget.click();
    }
  }

  ngOnDestroy() {
    this.ref?.close();
  }

}
