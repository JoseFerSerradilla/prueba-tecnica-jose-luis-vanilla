/**
 * @param {{ placeholder?: string, value?: string, onInput?: (value: string) => void, onKeyDown?: (e: KeyboardEvent) => void, ariaLabel?: string }} props
 * @returns {HTMLInputElement}
 */
export function createTextField({ placeholder = '', value = '', onInput, onKeyDown, ariaLabel }) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'text-field';
  input.placeholder = placeholder;
  input.value = value;
  if (ariaLabel) input.setAttribute('aria-label', ariaLabel);
  if (onInput) input.addEventListener('input', (e) => onInput(e.target.value));
  if (onKeyDown) input.addEventListener('keydown', onKeyDown);
  return input;
}
