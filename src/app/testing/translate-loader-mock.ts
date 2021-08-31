import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import * as translations from '../../assets/i18n/en-lang.json';

export class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}
