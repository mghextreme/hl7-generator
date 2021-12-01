import { Injectable } from '@angular/core';
import { ISection, IValidationError, MrgSection, MshSection, ObxSection, OrcSection, PidSection, RxrSection } from 'app/models';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public validateMessage(sections: ISection[]): IValidationError[] {
    if (sections === null ||
      sections === undefined ||
      sections.length === 0) {
      return [{ errorCode: 'message-empty' }];
    }

    const errors: IValidationError[] = [];
    this.mshValidation(sections).forEach(x => errors.push(x));
    this.mrgValidation(sections).forEach(x => errors.push(x));
    this.obxValidation(sections).forEach(x => errors.push(x));
    this.orcValidation(sections).forEach(x => errors.push(x));
    this.pidValidation(sections).forEach(x => errors.push(x));
    this.rxrValidation(sections).forEach(x => errors.push(x));

    return errors;
  }

  private mshValidation(sections: ISection[]): IValidationError[] {
    const mshSections = _.filter(sections, (x => x instanceof MshSection));

    if (mshSections.length === 0) {
      return [{ errorCode: 'msh-none' }];
    }

    if (mshSections.length > 1) {
      return [{ errorCode: 'msh-multiple', sectionId: mshSections[1].id }];
    }

    const msh = mshSections[0];
    const errors: IValidationError[] = [];

    if (!(sections[0] instanceof MshSection)) {
      errors.push({ errorCode: 'msh-not-first', sectionId: msh.id });
    }

    if (!!!msh.getField(7).hasValueAndExpanded()) {
      errors.push({
        errorCode: 'msh-7-required',
        sectionId: msh.id,
        fieldNumber: 7
      });
    }

    if (!!!msh.getField(9).hasValueAndExpanded()) {
      errors.push({
        errorCode: 'msh-9-required',
        sectionId: msh.id,
        fieldNumber: 9
      });
    }

    if (!!!msh.getField(10).hasValueAndExpanded()) {
      errors.push({
        errorCode: 'msh-10-required',
        sectionId: msh.id,
        fieldNumber: 10
      });
    }

    if (!!!msh.getField(11).hasValueAndExpanded()) {
      errors.push({
        errorCode: 'msh-11-required',
        sectionId: msh.id,
        fieldNumber: 11
      });
    }

    if (!!!msh.getField(12).hasValueAndExpanded()) {
      errors.push({
        errorCode: 'msh-12-required',
        sectionId: msh.id,
        fieldNumber: 12
      });
    }

    return errors;
  }

  private mrgValidation(sections: ISection[]): IValidationError[] {
    const mrgSections = _.filter(sections, (x => x instanceof MrgSection));

    if (mrgSections.length === 0) {
      return [];
    }

    const errors: IValidationError[] = [];
    mrgSections.forEach(x => {
      if (!!!x.getField(1).hasValueAndExpanded()) {
        errors.push({
          errorCode: 'mrg-1-required',
          sectionId: x.id,
          fieldNumber: 1
        });
      }
    });

    return errors;
  }

  private obxValidation(sections: ISection[]): IValidationError[] {
    const obxSections = _.filter(sections, (x => x instanceof ObxSection));

    if (obxSections.length === 0) {
      return [];
    }

    const errors: IValidationError[] = [];
    obxSections.forEach(x => {
      if (!!!x.getField(3).hasValueAndExpanded()) {
        errors.push({
          errorCode: 'obx-3-required',
          sectionId: x.id,
          fieldNumber: 3
        });
      }
    });

    return errors;
  }

  private orcValidation(sections: ISection[]): IValidationError[] {
    const orcSections = _.filter(sections, (x => x instanceof OrcSection));

    if (orcSections.length === 0) {
      return [];
    }

    const errors: IValidationError[] = [];
    orcSections.forEach(x => {
      if (!!!x.getField(1).hasValueAndExpanded()) {
        errors.push({
          errorCode: 'orc-1-required',
          sectionId: x.id,
          fieldNumber: 1
        });
      }
    });

    return errors;
  }

  private pidValidation(sections: ISection[]): IValidationError[] {
    const pidSections = _.filter(sections, (x => x instanceof PidSection));

    if (pidSections.length === 0) {
      return [];
    }

    const errors: IValidationError[] = [];
    pidSections.forEach(x => {
      if (!!!x.getField(3).hasValueAndExpanded()) {
        errors.push({
          errorCode: 'pid-3-required',
          sectionId: x.id,
          fieldNumber: 3
        });
      }

      if (!!!x.getField(5).hasValueAndExpanded()) {
        errors.push({
          errorCode: 'pid-5-required',
          sectionId: x.id,
          fieldNumber: 5
        });
      }
    });

    return errors;
  }

  private rxrValidation(sections: ISection[]): IValidationError[] {
    const rxrSections = _.filter(sections, (x => x instanceof RxrSection));

    if (rxrSections.length === 0) {
      return [];
    }

    const errors: IValidationError[] = [];
    rxrSections.forEach(x => {
      if (!!!x.getField(1).hasValueAndExpanded()) {
        errors.push({
          errorCode: 'rxr-1-required',
          sectionId: x.id,
          fieldNumber: 1
        });
      }
    });

    return errors;
  }
}
