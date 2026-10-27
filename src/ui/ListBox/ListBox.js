/**
 * Lista seleccionable de items de texto. No decide la lógica de selección
 * (single/multi), solo delega los eventos del usuario al llamador.
 * @param {{
 *   items: import('../../domain/textItem.js').TextItem[],
 *   selectedIds: Set<string>,
 *   emptyMessage: string,
 *   onItemClick: (id: string, event: MouseEvent) => void,
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
    li.addEventListener('click', (e) => onItemClick(item.id, e));
    list.appendChild(li);
  }

  return list;
}
