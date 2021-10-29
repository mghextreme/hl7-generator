import { Injectable } from '@angular/core';
import { Template } from 'app/models';
import { MessageConfigurationService } from './message-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private _templates: Template[];

  constructor(
    private configService: MessageConfigurationService
  ) {
    this._templates = JSON.parse(this.templatesString);
  }

  getAll(): Template[] {
    return this._templates;
  }

  exists(title: string): boolean {
    return this._templates.some(t => t.title === title);
  }

  add(template: Template): void {
    this._templates.push(template);
    this._templates = this._templates.sort((a, b) => a.title > b.title ? 1 : -1);

    this.saveTemplates();
  }

  delete(title: string): void {
    this._templates = this._templates.filter(t => t.title !== title);

    this.saveTemplates();
  }

  private saveTemplates() {
    this.templatesString = JSON.stringify(this._templates);
  }

  private get templatesString(): string {
    return this.configService.retrieve('templates') ?? '[]';
  }
  private set templatesString(value: string) {
    this.configService.store('templates', value);
  }
}
