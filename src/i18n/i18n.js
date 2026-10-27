import { translations, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './translations.js';

const STORAGE_KEY = 'prueba-tecnica:locale';

/** Lee el idioma guardado en localStorage, si lo hay y es uno soportado. */
export function loadStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function storeLocale(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // almacenamiento no disponible (navegación privada, etc.): no es crítico
  }
}

/** @param {string} locale @returns {(key: string) => string} */
export function createTranslator(locale) {
  const dict = translations[locale] ?? translations[DEFAULT_LOCALE];
  return (key) => dict[key] ?? key;
}

export { SUPPORTED_LOCALES };
