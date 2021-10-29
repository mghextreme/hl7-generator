import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';
import { IOption } from './option.interface';

export class OptionsField extends BaseField<OptionsField> {
  value?: string = '';
  selectItems: SelectItem[];
  editable = true;

  constructor(
    private readonly translate: TranslateService,
    fieldNumber: number,
    id: string,
    private readonly options: IOption[],
    i18n?: string
  ) {
    super(
      FieldType.Options,
      fieldNumber,
      id,
      i18n);

    this.verifyOptions();
    this.selectItems = options.map(x => {
      return {
        label: translate.instant(x.i18n),
        value: x.value
      } as SelectItem;
    });
    this.setCustomOrDefaultValue();
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null &&
           this.value !== '';
  }

  public setValue(value: any): void {
    if (value instanceof String || typeof(value) === 'string') {
      const selectedOption = this.options.find((x) => x.value === value);
      if (selectedOption !== undefined) {
        this.value = selectedOption.value;
      } else {
        this.setCustomOrDefaultValue(value as string);
      }
    }

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.value.toString();
  }

  private verifyOptions(): void {
    const emptyOption = this.options.find(x => x.value === '');
    if (emptyOption === undefined) {
      this.options.unshift({ value: '', i18n: 'actions.select-option' });
    }
  }

  private setCustomOrDefaultValue(value?: string): void {
    this.value = this.editable && value !== undefined ? value : '';
  }
}
