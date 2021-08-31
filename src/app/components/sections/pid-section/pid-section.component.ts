import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PidSection } from 'app/models';

@Component({
  selector: 'pid-section',
  templateUrl: './pid-section.component.html',
  styleUrls: ['./pid-section.component.scss']
})
export class PidSectionComponent {
  @Input() section: PidSection;

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
