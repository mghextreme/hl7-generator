import { FieldType } from './field-type.enum';
import { IField } from './field.interface';

export abstract class BaseField<T extends IField> implements IField {
  expanded: boolean = false;
  collapsable: boolean = true;
  required: boolean = false;

  private _i18n: string;

  valueGenerator?: (field: T) => void;

  constructor(
    public type: FieldType,
    public fieldNumber: number,
    public id: string,
    i18n?: string
  ) {
    this._i18n = i18n !== undefined ? i18n : 'sections.' + this.id;
  }

  public get i18n(): string {
    return this._i18n;
  }

  public init(init?: Partial<T>): T {
    Object.assign(this, init);
    return this.toGeneric();
  }

  public hasValueAndExpanded(): boolean {
    return this.expanded &&
           this.hasValue();
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
