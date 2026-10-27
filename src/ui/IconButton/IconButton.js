const UNDO_ICON = `
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 10h10a5 5 0 0 1 0 10H8" />
    <polyline points="7 5 3 10 7 15" />
  </svg>
`;

/**
 * @param {{ label: string, onClick?: () => void, disabled?: boolean }} props
 * @returns {HTMLButtonElement}
 */
export function createIconButton({ label, onClick, disabled = false }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'icon-btn';
  button.innerHTML = UNDO_ICON;
  button.setAttribute('aria-label', label);
  button.title = label;
  button.disabled = disabled;
  if (onClick) button.addEventListener('click', onClick);
  return button;
}
