import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISection } from 'app/models';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() section: ISection;

  @Output() remove = new EventEmitter<number>();
  @Output() change = new EventEmitter<void>();

  public handleRemove(): void {
    this.remove.emit(this.section.id);
  }

  public handleChange() {
    this.change.emit();
  }

  public handleAddField(number: number) {
    const fields = this.section.fields.filter(f => f.number === number);
    fields.forEach(f => f.expanded = true);
    this.change.emit();
  }

  public handleRemoveField(number: number) {
    const fields = this.section.fields.filter(f => f.number === number);
    fields.forEach(f => f.expanded = false);
    this.change.emit();
  }
}
