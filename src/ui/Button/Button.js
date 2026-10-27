/**
 * @param {{ label: string, variant?: 'primary'|'outline', onClick?: () => void, disabled?: boolean, type?: string }} props
 * @returns {HTMLButtonElement}
 */
export function createButton({ label, variant = 'primary', onClick, disabled = false, type = 'button' }) {
  const button = document.createElement('button');
  button.type = type;
  button.textContent = label;
  button.className = `btn btn--${variant}`;
  button.disabled = disabled;
  if (onClick) button.addEventListener('click', onClick);
  return button;
}
