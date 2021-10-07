import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IField } from 'app/models/fields';
import { MessageConfigurationService } from 'app/services';
import moment from 'moment-timezone';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  @Input() field: IField;

  @Output() change = new EventEmitter<void>();

  constructor(private configService: MessageConfigurationService) { }

  public handleChange() {
    this.change.emit();
  }

  public setNow() {
    this.field.setValue(moment.tz(this.configService.timezone).local(true).toDate());
  }
}
