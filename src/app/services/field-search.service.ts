import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldSearchResult, ISection } from 'app/models';
import fuzzysort from 'fuzzysort';

@Injectable({
  providedIn: 'root'
})
export class FieldSearchService {

  private limit: number;
  private fields: FieldSearchResult[];

  constructor(private readonly translate: TranslateService) {
    this.limit = 7;
  }

  public updateFields(sections: ISection[]): void {
    this.fields = [];

    sections.forEach((section: ISection) => {
      section.fields.forEach((field) => {
        const newField = new FieldSearchResult({
          parentId: section.id,
          parentTitle: this.translate.instant('sections.' + section.type.toLowerCase() + '.title'),
          fieldNumber: field.number,
          id: section.type + '.' + field.number,
          title: this.translate.instant(field.i18n + '.name'),
          tags: this.translate.instant(field.i18n + '.tags')
        });
        this.fields.push(newField);
      });
    });
  }

  public search(query: string): FieldSearchResult[] {
    const results = fuzzysort.go(query, this.fields, {
      limit: this.limit,
      allowTypo: true,
      threshold: -9000,
      keys: ['id', 'title', 'tags', 'parentTitle'],
      scoreFn: (a) => Math.max(
        a[0] ? a[0].score : -10000,
        a[1] ? a[1].score - 40 : -10000,
        a[2] ? a[2].score - 60 : -10000,
        a[3] ? a[3].score - 200 : -10000)
    });
    return results.map(x => {
      return {
        id: x[0] ? fuzzysort.highlight(x[0]) : x.obj.id,
        title: x[1] ? fuzzysort.highlight(x[1]) : x.obj.title,
        parentTitle: x[3] ? fuzzysort.highlight(x[3]) : x.obj.parentTitle,
        parentId: x.obj.parentId,
        fieldNumber: x.obj.fieldNumber
      } as FieldSearchResult;
    });
  }
}
