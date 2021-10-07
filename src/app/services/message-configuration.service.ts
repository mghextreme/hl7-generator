import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageConfigurationService {

  private _timezone;
  private _fieldSeparator;
  private _componentSeparator;
  private _subComponentSeparator;
  private _fieldRepeatSeparator;
  private _escapeCharacter;

  constructor(){
    this._timezone = this.retrieve('timezone') ?? 'UTC';
    this._fieldSeparator = this.retrieve('MSH.1') ?? '|';
    this._componentSeparator = this.retrieve('MSH.2.1') ?? '^';
    this._fieldRepeatSeparator = this.retrieve('MSH.2.2') ?? '~';
    this._escapeCharacter = this.retrieve('MSH.2.3') ?? '\\';
    this._subComponentSeparator = this.retrieve('MSH.2.4') ?? '&';
  }

  get fieldSeparator(): string {
    return this._fieldSeparator;
  }
  set fieldSeparator(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._fieldSeparator = char;
    }
  }

  get componentSeparator(): string {
    return this._componentSeparator;
  }
  set componentSeparator(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._componentSeparator = char;
    }
  }

  get fieldRepeatSeparator(): string {
    return this._fieldRepeatSeparator;
  }
  set fieldRepeatSeparator(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._fieldRepeatSeparator = char;
    }
  }

  get escapeCharacter(): string {
    return this._escapeCharacter;
  }
  set escapeCharacter(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._escapeCharacter = char;
    }
  }

  get subComponentSeparator(): string {
    return this._subComponentSeparator;
  }
  set subComponentSeparator(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._subComponentSeparator = char;
    }
  }

  get timezone(): string {
    return this._timezone;
  }
  set timezone(text: string) {
    if (text !== null && text !== undefined && text !== this._timezone) {
      this._timezone = text;
      this.store('timezone', this._timezone);
    }
  }

  public store(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public storeCollection(key: string, value: string[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public retrieve(key: string): string {
    return localStorage.getItem(key);
  }

  public retrieveCollection(key: string): string[] {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue) as string[];
  }
}
