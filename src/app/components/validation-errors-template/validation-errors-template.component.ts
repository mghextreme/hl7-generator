import { Component } from '@angular/core';
import { IValidationError } from 'app/models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './validation-errors-template.component.html',
  styleUrls: ['./validation-errors-template.component.scss']
})
export class ValidationErrorsTemplateComponent {

  errors: IValidationError[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const errorInput = config.data.errors ?? [];
    this.errors = errorInput as IValidationError[];
  }

  goToError(error: IValidationError) {
    this.ref.close(error);
  }

  close() {
    this.ref.close();
  }
}
