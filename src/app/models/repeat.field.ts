import _ from 'lodash';
import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';
import { MessageConfigurationService } from 'app/services';
import { IField } from './field.interface';

export class RepeatField extends BaseField<RepeatField> {
  private subfields: IField[];

  constructor(
    private readonly configService: MessageConfigurationService,
    private readonly template: IField
  ) {
    super(
      FieldType.Repeat,
      template.fieldNumber,
      template.id,
      template.i18n);

    this.subfields = [];
    this.addSubfield();
  }

  public hasValue(): boolean {
    return _.some(this.subfields, s => s.hasValue());
  }

  public setValue(value: any): void {
    this.subfields = [];

    if (value === null ||
        value === undefined) {
      return;
    }

    let bits: string[] = [];
    if (value instanceof Array) {
      bits = value;
    } else if (value instanceof String || typeof(value) === 'string') {
      bits = value.split(this.configService.fieldRepeatSeparator);
    }

    bits.forEach(b => this.addSubfield(b));

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.subfields.map(s => s.toString()).join(this.configService.fieldRepeatSeparator);
  }

  public addSubfield(value?: string): void {
    const newField = _.cloneDeep(this.template);
    newField.setValue(value);
    this.subfields.push(newField);
  }

  public removeSubfield(): void {
    if (this.subfields.length > 1) {
      this.subfields.pop();
    }
  }
}
