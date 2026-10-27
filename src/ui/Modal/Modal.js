/**
 * Monta un modal accesible (overlay + dialog) con el contenido dado y lo
 * añade al <body>. Se cierra con Escape, click en el overlay o llamando a
 * `close()`.
 * @param {{ titleId: string, content: HTMLElement, onClose?: () => void }} props
 * @returns {{ close: () => void }}
 */
export function openModal({ titleId, content, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  if (titleId) dialog.setAttribute('aria-labelledby', titleId);
  dialog.appendChild(content);

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', handleKeyDown);
    overlay.remove();
    onClose?.();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') close();
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', handleKeyDown);

  const focusable = dialog.querySelector('input, button, [tabindex]');
  focusable?.focus();

  return { close };
}
