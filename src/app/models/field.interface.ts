import { FieldType } from './field-type.enum';
import { IOption } from './option.interface';

export interface IField {
  i18n: string;
  number: number;
  type: FieldType;

  options?: IOption[];
  subfields?: IField[];
}
