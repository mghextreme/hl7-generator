import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageConfigurationService {

  private _splitChar;
  private _subSplitChar;

  constructor(){
    this._splitChar = this.retrieve('MSH.1') ?? '|';
    this._subSplitChar = this.retrieve('subSliptChar') ?? '^';
  }

  get splitChar(): string {
    return this._splitChar;
  }
  set splitChar(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._splitChar = char;
      this.store('MSH.1', this._splitChar);
    }
  }

  get subSplitChar(): string {
    return this._subSplitChar;
  }
  set subSplitChar(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._subSplitChar = char;
      this.store('subSliptChar', this._subSplitChar);
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
