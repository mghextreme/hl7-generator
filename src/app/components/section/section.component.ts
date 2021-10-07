import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISection } from 'app/models';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() section: ISection;

  @Output() remove = new EventEmitter<string>();
  @Output() change = new EventEmitter<void>();

  public handleRemove(): void {
    this.remove.emit(this.section.id);
  }

  public handleGenerateData(): void {
    const anySection = this.section as any;
    if (anySection.generateData) {
      anySection.generateData();
      this.change.emit();
    }
  }

  public handleGenerateFieldData(fieldNumber: number) {
    const field = this.section.getField(fieldNumber);
    if (field && field.generate) {
      field.generate();
      this.change.emit();
    }
  }

  public handleChange() {
    this.change.emit();
  }

  public handleExpand() {
    this.section.expanded = true;
  }

  public handleCollapse() {
    this.section.expanded = false;
  }

  public handleAddField(number: number) {
    const field = this.section.getField(number);
    if (field) {
      field.expanded = true;
    }
    this.change.emit();
  }

  public handleRemoveField(number: number) {
    const fields = this.section.fields.filter(f => f.number === number);
    fields.forEach(f => f.expanded = false);
    this.change.emit();
  }
}
