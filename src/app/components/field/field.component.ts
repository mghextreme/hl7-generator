import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IField } from 'app/models/fields';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  @Input() field: IField;

  @Output() change = new EventEmitter<void>();

  public handleChange() {
    this.change.emit();
  }
}
