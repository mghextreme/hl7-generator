import { Component } from '@angular/core';
import { Template } from 'app/models';
import { TemplateService } from 'app/services/template.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplate {

  isNew: boolean;
  template: Template;
  originalTemplate: Template;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private templateService: TemplateService
  ) {
    this.isNew = config.data.isNew ?? false;

    const title = config.data.title ?? '';
    const hl7 = config.data.hl7 ?? '';
    this.originalTemplate = { title: title, content: hl7 };
    this.template = this.originalTemplate;
  }

  save(): void {
    if (this.isNew) {
      if (!this.templateService.exists(this.template.title)) {
        this.templateService.add(this.template);
        this.close();
      }
    } else {
      this.templateService.delete(this.originalTemplate.title);
      this.templateService.add(this.template);
      this.close();
    }
  }

  close() {
    this.ref.close();
  }
}
