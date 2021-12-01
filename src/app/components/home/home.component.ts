import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Clipboard as MyClipboard } from '@angular/cdk/clipboard';
import { AutoComplete } from 'primeng/autocomplete';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldSearchResult, ISection, IValidationError, MrgSection, MshSection, ObrSection, ObxSection, OrcSection, PidSection, Pv1Section, RxeSection, RxrSection, SectionType, Template } from 'app/models';
import { FieldSearchService, MessageConfigurationService, TemplateService, ValidationService } from 'app/services';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { EditTemplateComponent } from '../edit-template/edit-template.component';
import { ValidationErrorsTemplateComponent } from '../validation-errors-template/validation-errors-template.component';
import { Hl7MessageUtils } from 'app/utils';

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

    this.hl7 = this.configService.retrieve('hl7') ?? '';
    setTimeout(() => this.parseHl7(), 1);
  }

  public addSection(type: string) {
    const newSection = Hl7MessageUtils.newSection(this.configService, this.translate, type);
    if (newSection) {
      this.sections.push(newSection);
      this.updateFilter();
      this.generateHl7();
    }
  }

  public parseHl7(): void {
    this.sections = Hl7MessageUtils.parse(this.configService, this.translate, this.hl7);

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

  public handleHl7Change(): void {
    this.configService.store('hl7', this.hl7);
  }

  private generateHl7(): void {
    this.expectedHl7 = _.join(this.sections.map(s => s.toString() + this.configService.escapeCharacter + 'r'), '\r\n');
    this.hl7 = this.expectedHl7;

    this.handleHl7Change();
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
    this.ref = this.dialogService.open(EditTemplateComponent, {
      header: this.translate.instant('templates.add'),
      width: '50%',
      contentStyle: { 'max-height': '500px', 'padding': '0' },
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
    this.ref = this.dialogService.open(EditTemplateComponent, {
      header: this.translate.instant('templates.edit'),
      width: '50%',
      contentStyle: { 'max-height': '500px', 'padding': '0' },
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
    this.ref = this.dialogService.open(ValidationErrorsTemplateComponent, {
      header: this.translate.instant('validation.window-title'),
      width: '50%',
      contentStyle: { 'max-height': '500px', 'padding': '0' },
      data: {
        errors: this.validationErrors
      }
    });

    this.ref.onClose.subscribe((error: IValidationError) => {
      if (error !== undefined &&
          error.sectionId !== undefined) {
        this.goTo(error.sectionId, error.fieldNumber);
      }
    });
  }

  private refreshTemplates(): void {
    this.templates = this.templateService.getAll();
  }

  private updateFilter() {
    this.fieldSearch.updateFields(this.sections);
  }

  private goTo(parentId: string, fieldNumber?: number) {
    const section = _.find(this.sections, s => s.id === parentId);
    if (section) {
      section.expanded = true;

      if (fieldNumber !== undefined) {
        const field = section.getField(fieldNumber);
        field.expanded = true;

        setTimeout(() => this.scrollTo(parentId, field.fieldNumber), 100);
        setTimeout(() => this.focusInto(parentId, field.id), 150);
      } else {
        setTimeout(() => this.scrollTo(parentId, section.fields[0].fieldNumber), 100);
      }
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
