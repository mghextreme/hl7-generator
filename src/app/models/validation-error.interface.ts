export interface IValidationError {
  errorCode: string;
  sectionId?: string;
  fieldNumber?: number;
  fieldId?: string;
  fieldName?: string;
}
