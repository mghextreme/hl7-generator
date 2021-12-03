import _ from 'lodash';
import { MessageConfigurationService } from 'app/services';
import { FieldType } from './field-type.enum';
import { IField } from './field.interface';
import { BaseField } from './base-field';

export class MultipleField extends BaseField<MultipleField> {

  showSubFields = false;

  constructor(
    private readonly configService: MessageConfigurationService,
    fieldNumber: number,
    id: string,
    private subfields: IField[],
    i18n?: string,
    public level = 1
  ) {
    super(
      FieldType.Multiple,
      fieldNumber,
      id,
      i18n);
  }

  public get value(): string {
    return this.toString();
  }
  public set value(text: string) {
    this.setValue(text);
  }

  public toggleSubFieldsDisplay(): void {
    this.showSubFields = !this.showSubFields;
  }

  public hasValue(): boolean {
    return _.some(this.subfields, f => f.hasValue());
  }

  public getField(fieldNumber: number): IField {
    return _.find(this.subfields, f => f.fieldNumber === fieldNumber);
  }

  public setValue(value: any): void {
    if (value instanceof String || typeof(value) === 'string') {
      const bits = value.split(this.getSplitCharacter());
      this.setValueFromArray(bits);
    } else if (value instanceof Array) {
      this.setValueFromArray(value);
    }

    if (this.hasValue()) {
      this.expanded = true;

      this.updateSubFieldsDisplay();
    }
  }

  public toString(): string {
    return this.customToString(this);
  }

  public customToString = (field: MultipleField): string => {
    let result = '';
    let lastIndex = 1;

    const separator = this.getSplitCharacter();

    for (const cur of field.subfields) {
      if (cur.hasValue()) {
          result += separator.repeat(cur.fieldNumber - lastIndex);
          lastIndex = cur.fieldNumber;

          result += cur.toString();
      }
    }

    return result;
  }

  private getSplitCharacter(): string {
    switch (this.level) {
      case 2: return this.configService.subComponentSeparator;
      default: return this.configService.componentSeparator;
    }
  }

  private setValueFromArray(values: any[]): void {
    for (let i = 0; i < values.length; i++) {
      const field = this.getField(i + 1);
      if (field) {
        field.setValue(values[i]);
      }
    }
  }

  private updateSubFieldsDisplay(): void {
    this.showSubFields = this.showSubFields || _.some(this.subfields, s => s.fieldNumber > 1 && s.hasValue());
  }
}
