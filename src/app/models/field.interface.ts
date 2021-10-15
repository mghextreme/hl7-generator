import { FieldType } from './field-type.enum';

export interface IField {
  id: string;
  number: number;
  type: FieldType;
  expanded: boolean;
  required: boolean;

  i18n: string;

  init(init?: Partial<IField>): IField;

  valueGenerator?: (field: IField) => void;

  hasValueAndExpanded(): boolean;

  hasValue(): boolean;

  setValue(value: any): void;

  generate(): void;

  toString(): string;
}
