import { FieldType } from './field-type.enum';

export interface IField {
  i18n: string;
  number: number;
  type: FieldType;
  expanded: boolean;
  required: boolean;

  init(init?: Partial<IField>): IField;

  valueGenerator?: (field: IField) => void;

  hasValueAndExpanded(): boolean;

  hasValue(): boolean;

  setValue(value: any): void;

  generate(): void;

  toString(): string;
}
