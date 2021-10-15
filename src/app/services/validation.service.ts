import { Injectable } from '@angular/core';
import { ISection, IValidationError, MshSection } from 'app/models';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public validateMessage(sections: ISection[]): IValidationError[] {
    if (sections.length == 0) {
      return this.toValidationError([ 'message-empty' ]);
    }

    const errors: IValidationError[] = [];
    this.mshValidation(sections).forEach(x => errors.push(x));

    return errors;
  }

  private mshValidation(sections: ISection[]): IValidationError[] {
    const mshSections = _.filter(sections, (x => x instanceof MshSection));

    if (mshSections.length === 0) {
      return this.toValidationError([ 'msh-none' ]);
    }

    if (mshSections.length > 1) {
      return this.toValidationError([ 'msh-multiple' ]);
    }

    if (!(sections[0] instanceof MshSection)) {
      return this.toValidationError([ 'msh-not-first' ]);
    }

    return [];
  }

  private toValidationError(errorCodes: string[]): IValidationError[] {
    return errorCodes.map(x => { return { errorCode: x } as IValidationError });
  }
}
