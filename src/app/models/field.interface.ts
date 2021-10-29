import { FieldType } from './field-type.enum';

export interface IField {
  id: string;
  fieldNumber: number;
  type: FieldType;
  expanded: boolean;
  required: boolean;

  i18n: string;

  valueGenerator?: (field: IField) => void;

  init(init?: Partial<IField>): IField;

  hasValueAndExpanded(): boolean;

  hasValue(): boolean;

  setValue(value: any): void;

  generate(): void;

  toString(): string;
}
