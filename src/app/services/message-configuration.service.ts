import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageConfigurationService {

  private _splitChar: string = '|';
  private _subSplitChar: string = '^';

  get splitChar(): string {
    return this._splitChar;
  }
  set splitChar(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._splitChar = char;
    }
  }

  get subSplitChar(): string {
    return this._subSplitChar;
  }
  set subSplitChar(char: string) {
    if (char !== null && char !== undefined && char.length === 1) {
      this._subSplitChar = char;
    }
  }
}
