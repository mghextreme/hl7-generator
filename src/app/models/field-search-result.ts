export class FieldSearchResult {
  parentId: number;
  parentTitle: string;
  fieldNumber: number;
  id: string;
  title: string;
  tags?: string;

  constructor(init?: Partial<FieldSearchResult>) {
    Object.assign(this, init);
  }
}
