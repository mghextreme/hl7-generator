import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISection, IValidationError, MshSection, SectionType } from 'app/models';
import { FieldType } from 'app/models/field-type.enum';
import { StringField } from 'app/models/string.field';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private readonly translate: TranslateService
  ) { }

  public validateMessage(sections: ISection[]): IValidationError[] {
    if (sections === null ||
      sections === undefined ||
      sections.length === 0) {
      return [{ errorCode: 'message-empty' }];
    }

    const errors: IValidationError[] = [];
    this.mshValidation(sections).forEach(x => errors.push(x));
    sections.forEach(s => {
      this.validateFields(s).forEach(e => errors.push(e));
    })

    return errors;
  }

  private mshValidation(sections: ISection[]): IValidationError[] {
    const mshSections = _.filter(sections, (x => x.type === SectionType.MSH));

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

    return errors;
  }

  private validateFields(section: ISection): IValidationError[] {
    var errors: IValidationError[] = [];
    section.fields.forEach(f => {
      if (f.required && !f.hasValueAndExpanded()) {
        errors.push({
          errorCode: 'field-required',
          sectionId: section.id,
          fieldNumber: f.fieldNumber,
          fieldId: this.getFieldId(section.type, f.fieldNumber),
          fieldName: this.getFieldName(section.type, f.fieldNumber)
        });
      }

      if (f.type === FieldType.String && f instanceof StringField) {
        if (f.hasValue()) {
          if (f.value.length > f.maxLength) {
            errors.push({
              errorCode: 'field-string-length-greater-than-max',
              sectionId: section.id,
              fieldNumber: f.fieldNumber,
              fieldId: this.getFieldId(section.type, f.fieldNumber),
              fieldName: this.getFieldName(section.type, f.fieldNumber)
            });
          } else if (f.value.length < f.minLength) {
            errors.push({
              errorCode: 'field-string-length-lower-than-min',
              sectionId: section.id,
              fieldNumber: f.fieldNumber,
              fieldId: this.getFieldId(section.type, f.fieldNumber),
              fieldName: this.getFieldName(section.type, f.fieldNumber)
            });
          }
        }
      }
    });

    return errors;
  }

  private getFieldId(type: SectionType, fieldNumber: number): string {
    return type.toString() + '.' + fieldNumber.toString();
  }

  private getFieldName(type: SectionType, fieldNumber: number): string {
    return this.translate.instant('sections.' + type.toString().toLowerCase() + '.' + fieldNumber.toString() + '.name')
  }
}
