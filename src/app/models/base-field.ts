import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export abstract class BaseField<T extends IField> implements IField {
  expanded: boolean;
  required: boolean;

  valueGenerator?: (field: T) => void;

  constructor(
    public type: FieldType,
    public number: number,
    public i18n: string) { }

  public init(init?: Partial<T>): T {
    Object.assign(this, init);
    return this.toGeneric();
  }

  public abstract hasValue(): boolean;

  public abstract setValue(value: any): void;

  public abstract toString(): string;

  public generate(): void {
    if (this.valueGenerator) {
      this.valueGenerator(this.toGeneric());
    }
  }

  private toGeneric(): T {
    const asAny = this as any;
    return asAny as T;
  }

}
