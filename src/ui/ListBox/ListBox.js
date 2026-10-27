/**
 * Lista seleccionable de items de texto. No decide la lógica de selección
 * (single/multi), solo delega los eventos del usuario al llamador.
 *
 * Usa `role="listbox"`/`role="option"` sobre `<ul>`/`<li>` en vez de un
 * `<select>` nativo a propósito: es el patrón "custom listbox" de la
 * WAI-ARIA Authoring Practices Guide, necesario aquí porque el ítem
 * seleccionado necesita un estilo (fondo a todo lo ancho, color de texto)
 * que un `<select>` nativo no permite personalizar.
 * @param {{
 *   items: import('../../domain/textItem.js').TextItem[],
 *   selectedIds: Set<string>,
 *   emptyMessage: string,
 *   onItemClick: (id: string, event: MouseEvent | KeyboardEvent) => void,
 * }} props
 * @returns {HTMLElement}
 */
export function createListBox({ items, selectedIds, emptyMessage, onItemClick }) {
  const list = document.createElement('ul');
  list.className = 'list-box';
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-multiselectable', 'true');

  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'list-box__empty';
    empty.textContent = emptyMessage;
    list.appendChild(empty);
    return list;
  }

  for (const item of items) {
    const isSelected = selectedIds.has(item.id);
    const li = document.createElement('li');
    li.className = `list-item${isSelected ? ' list-item--selected' : ''}`;
    li.textContent = item.text;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(isSelected));
    li.tabIndex = 0;
    li.addEventListener('click', (e) => onItemClick(item.id, e));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onItemClick(item.id, e);
      }
    });
    list.appendChild(li);
  }

  return list;
}
