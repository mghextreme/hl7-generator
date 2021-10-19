import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';
import { IOption } from './option.interface';

export class OptionsField extends BaseField<OptionsField> {
  value?: string;
  selectItems: SelectItem[];

  constructor(
    readonly translate: TranslateService,
    number: number,
    i18n: string,
    private readonly options: IOption[]
  ) {
    super(
      FieldType.Options,
      number,
      i18n);

      this.selectItems = options.map(x => {
        return {
          label: translate.instant(x.i18n),
          value: x.value
        } as SelectItem
      });
      this.value = null;
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null;
  }

  public setValue(value: any): void {
    if (value instanceof String || typeof(value) === 'string') {
      const selectedOption = this.options.find((x) => x.value == value);
      if (selectedOption !== undefined) {
        this.value = selectedOption.value;
      } else {
        this.value = null;
      }
    }

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.value.toString();
  }
}