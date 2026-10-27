import { TextItem } from './textItem.js';
import { NoSelectionError, DuplicateItemError } from './errors.js';

/**
 * Aggregate root: la lista de cadenas de texto y las invariantes que
 * la gobiernan (no se borra sin selección, no hay dos items con el mismo
 * texto, los items son siempre TextItem válidos).
 */
export class TextList {
  constructor(items = []) {
    this.items = items;
  }

  add(text) {
    const item = TextItem.create(text);
    const isDuplicate = this.items.some(
      (existing) => existing.text.toLowerCase() === item.text.toLowerCase(),
    );
    if (isDuplicate) throw new DuplicateItemError();

    return new TextList([...this.items, item]);
  }

  remove(ids) {
    if (!ids || ids.length === 0) throw new NoSelectionError();
    const idSet = new Set(ids);
    return new TextList(this.items.filter((item) => !idSet.has(item.id)));
  }

  toArray() {
    return this.items;
  }
}
