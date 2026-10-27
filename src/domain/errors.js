/*
 * Mensajes en inglés a propósito: son el valor por defecto "técnico" del
 * dominio (útil en consola/logs), neutral respecto al idioma de la UI.
 * La capa de presentación decide cómo traducir cada error según su tipo
 * (ver features/add-item), el dominio no sabe nada de idiomas.
 */

export class EmptyTextError extends Error {
  constructor() {
    super("The text can't be empty.");
    this.name = 'EmptyTextError';
  }
}

export class NoSelectionError extends Error {
  constructor() {
    super('You must select at least one item to delete it.');
    this.name = 'NoSelectionError';
  }
}

export class DuplicateItemError extends Error {
  constructor() {
    super('An item with that text already exists in the list.');
    this.name = 'DuplicateItemError';
  }
}
