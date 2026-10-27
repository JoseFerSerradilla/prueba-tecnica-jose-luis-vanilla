import { EmptyTextError } from './errors.js';

/**
 * Value object: una entrada de texto de la lista.
 * Inmutable y autovalidado: no puede existir una instancia con texto vacío.
 */
export class TextItem {
  constructor(id, text) {
    const trimmed = text.trim();
    if (trimmed.length === 0) throw new EmptyTextError();

    this.id = id;
    this.text = trimmed;
    Object.freeze(this);
  }

  static create(text) {
    return new TextItem(crypto.randomUUID(), text);
  }
}
