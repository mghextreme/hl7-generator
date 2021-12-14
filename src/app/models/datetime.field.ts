import moment from 'moment';
import { FieldType } from './field-type.enum';
import { BaseField } from './base-field';

export class DateTimeField extends BaseField<DateTimeField> {
  value?: Date;
  fractionValue = '';
  timeZoneValue = '';

  displayExtension = false;
  includeSeconds = false;

  constructor(
    fieldNumber: number,
    id: string,
    i18n?: string
  ) {
    super(
      FieldType.DateTime,
      fieldNumber,
      id,
      i18n);

    this.value = new Date(new Date().setSeconds(0));
  }

  public hasValue(): boolean {
    return this.value !== undefined &&
           this.value !== null;
  }

  public setValue(value: any): void {
    if (value instanceof Date) {
      this.value = value;
    } else if (value instanceof String || typeof(value) === 'string') {
      if (value.length > 0) {

        const timeZoneCharIndex = Math.max(value.indexOf('+'), value.indexOf('-'));
        if (timeZoneCharIndex > 0) {
          this.timeZoneValue = value.substring(timeZoneCharIndex);
          value = value.substring(0, timeZoneCharIndex);
          this.displayExtension = true;
        }

        const fractionCharIndex = value.indexOf('.');
        if (fractionCharIndex > 0) {
          this.fractionValue = value.substring(fractionCharIndex + 1);
          value = value.substring(0, fractionCharIndex);
          this.displayExtension = true;
        }

        this.value = moment(value.padEnd(14, '0'), 'YYYYMMDDhhmmss').toDate();
      } else {
        this.value = null;
      }
    }

    if (this.hasValue()) {
      this.expanded = true;
    }
  }

  public toString(): string {
    return this.dateToString() + this.timeToString() + this.extensionToString();
  }

  public toggleExpansion(): void {
    this.displayExtension = !this.displayExtension;
  }

  private dateToString(): string {
    return this.value.getFullYear().toString().padStart(4, '0') +
      (this.value.getMonth() + 1).toString().padStart(2, '0') +
      this.value.getDate().toString().padStart(2, '0');
  }

  private timeToString(): string {
    return this.value.getHours().toString().padStart(2, '0') +
      this.value.getMinutes().toString().padStart(2, '0') +
      (this.includeSeconds || this.displayExtension ? this.value.getSeconds().toString().padStart(2, '0') : '');
  }

  private extensionToString(): string {
    if (!this.displayExtension ||
      (this.fractionValue.length === 0 && this.timeZoneValue.length === 0)) {
      return '';
    }

    return '.' + this.fractionValue.padEnd(4, '0') + this.timeZoneToString();
  }

  private timeZoneToString(): string {
    if (!this.timeZoneValue) {
      return '+00:00';
    }

    const firstChar = this.timeZoneValue[0];
    return firstChar !== '+' && firstChar !== '-'
      ? '+' + this.timeZoneValue
      : this.timeZoneValue;
  }
}
