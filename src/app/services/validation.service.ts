import { Injectable } from '@angular/core';
import { ISection, IValidationError, MshSection, ObxSection, PidSection } from 'app/models';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public validateMessage(sections: ISection[]): IValidationError[] {
    if (sections.length == 0) {
      return this.toValidationErrors([ 'message-empty' ]);
    }

    const errors: IValidationError[] = [];
    this.mshValidation(sections).forEach(x => errors.push(x));
    this.pidValidation(sections).forEach(x => errors.push(x));
    this.obxValidation(sections).forEach(x => errors.push(x));

    return errors;
  }

  private mshValidation(sections: ISection[]): IValidationError[] {
    const mshSections = _.filter(sections, (x => x instanceof MshSection));

    if (mshSections.length === 0) {
      return this.toValidationErrors([ 'msh-none' ]);
    }

    if (mshSections.length > 1) {
      return this.toValidationErrors([ 'msh-multiple' ]);
    }

    const errorCodes: string[] = []
    if (!(sections[0] instanceof MshSection)) {
      errorCodes.push('msh-not-first');
    }

    const msh = mshSections[0];
    if (!!!msh.getField(7).hasValueAndExpanded()) { errorCodes.push('msh-7-required'); }
    if (!!!msh.getField(9).hasValueAndExpanded()) { errorCodes.push('msh-9-required'); }
    if (!!!msh.getField(10).hasValueAndExpanded()) { errorCodes.push('msh-10-required'); }

    return this.toValidationErrors(errorCodes);
  }

  private pidValidation(sections: ISection[]): IValidationError[] {
    const pidSections = _.filter(sections, (x => x instanceof PidSection));

    const errorCodes: string[] = [];
    pidSections.forEach(x => {
      if (!!!x.getField(3).hasValueAndExpanded()) { errorCodes.push('pid-3-required'); }
      if (!!!x.getField(5).hasValueAndExpanded()) { errorCodes.push('pid-5-required'); }
    });

    return this.toValidationErrors(errorCodes);
  }

  private obxValidation(sections: ISection[]): IValidationError[] {
    const pidSections = _.filter(sections, (x => x instanceof ObxSection));

    const errorCodes: string[] = [];
    pidSections.forEach(x => {
      if (!!!x.getField(3).hasValueAndExpanded()) { errorCodes.push('obx-3-required'); }
    });

    return this.toValidationErrors(errorCodes);
  }

  private toValidationErrors(errorCodes: string[]): IValidationError[] {
    return errorCodes.map(x => { return { errorCode: x } as IValidationError });
  }
}
