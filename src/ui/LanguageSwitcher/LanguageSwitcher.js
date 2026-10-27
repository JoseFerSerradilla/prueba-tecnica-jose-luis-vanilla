import { SUPPORTED_LOCALES } from '../../i18n/i18n.js';

/**
 * Selector de idioma: un control pequeño con los códigos de idioma
 * soportados (EN/ES). El idioma activo queda resaltado.
 * @param {{ locale: string, onChange: (locale: string) => void }} props
 * @returns {HTMLElement}
 */
export function createLanguageSwitcher({ locale, onChange }) {
  const group = document.createElement('div');
  group.className = 'language-switcher';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Language / Idioma');

  for (const code of SUPPORTED_LOCALES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `language-switcher__option${code === locale ? ' language-switcher__option--active' : ''}`;
    button.textContent = code.toUpperCase();
    button.setAttribute('aria-pressed', String(code === locale));
    button.addEventListener('click', () => {
      if (code !== locale) onChange(code);
    });
    group.appendChild(button);
  }

  return group;
}
