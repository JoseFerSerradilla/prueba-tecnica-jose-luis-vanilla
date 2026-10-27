/**
 * Diccionario de traducciones. El texto de relleno ("lorem ipsum") se deja
 * igual en los dos idiomas a propósito: es tipografía de muestra sin
 * significado real, no una frase que tenga sentido traducir.
 */
const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. ' +
  'Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue ' +
  'fames dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.';

export const DEFAULT_LOCALE = 'en';

export const translations = {
  en: {
    documentTitle: 'Technical proof',
    title: 'This is a technical proof',
    description: LOREM_IPSUM,
    emptyList: 'There are no items yet. Add the first one with the "Add" button.',
    add: 'Add',
    delete: 'Delete',
    undo: 'Undo',
    cancel: 'Cancel',
    addItemTitle: 'Add item to list',
    placeholder: 'Type the text here...',
    errorEmpty: "The text can't be empty.",
    errorDuplicate: 'An item with that text already exists in the list.',
    errorNoSelection: 'You must select at least one item to delete it.',
  },
  es: {
    documentTitle: 'Prueba técnica',
    title: 'Esta es una prueba técnica',
    description: LOREM_IPSUM,
    emptyList: 'Todavía no hay elementos. Añade el primero con el botón "Añadir".',
    add: 'Añadir',
    delete: 'Eliminar',
    undo: 'Deshacer',
    cancel: 'Cancelar',
    addItemTitle: 'Añadir elemento a la lista',
    placeholder: 'Escribe aquí el texto...',
    errorEmpty: 'El texto no puede estar vacío.',
    errorDuplicate: 'Ya existe un elemento con ese texto en la lista.',
    errorNoSelection: 'Debes seleccionar al menos un elemento para eliminarlo.',
  },
};

export const SUPPORTED_LOCALES = Object.keys(translations);
