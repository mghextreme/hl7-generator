import { FieldType } from './field-type.enum';

export interface IField {
  i18n: string;
  number: number;
  type: FieldType;
  expanded: boolean;
  required: boolean;

  hasValue(): boolean;

  setValue(value: any): void;

  toString(): string;
}
