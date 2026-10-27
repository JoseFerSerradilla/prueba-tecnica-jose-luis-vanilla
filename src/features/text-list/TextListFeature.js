import { createListBox } from '../../ui/ListBox/ListBox.js';
import { createButton } from '../../ui/Button/Button.js';
import { createIconButton } from '../../ui/IconButton/IconButton.js';
import { createLanguageSwitcher } from '../../ui/LanguageSwitcher/LanguageSwitcher.js';

/**
 * Renderiza la card principal (selector de idioma, título, descripción,
 * listado y acciones). Función pura de presentación: no mantiene estado
 * propio, recibe el estado actual y delega cada interacción al llamador.
 * @param {{
 *   list: import('../../domain/textList.js').TextList,
 *   selectedIds: Set<string>,
 *   canUndo: boolean,
 *   locale: string,
 * }} state
 * @param {{
 *   onItemClick: (id: string, event: MouseEvent) => void,
 *   onDeleteSelected: () => void,
 *   onUndo: () => void,
 *   onOpenAddModal: () => void,
 *   onChangeLocale: (locale: string) => void,
 * }} actions
 * @param {(key: string) => string} t
 * @returns {HTMLElement}
 */
export function renderTextListCard(state, actions, t) {
  const card = document.createElement('section');
  card.className = 'text-list-card';

  const header = document.createElement('div');
  header.className = 'text-list-card__header';
  header.appendChild(createLanguageSwitcher({ locale: state.locale, onChange: actions.onChangeLocale }));

  const title = document.createElement('h1');
  title.className = 'text-list-card__title';
  title.textContent = t('title');

  const description = document.createElement('p');
  description.className = 'text-list-card__description';
  description.textContent = t('description');

  const listBox = createListBox({
    items: state.list.toArray(),
    selectedIds: state.selectedIds,
    emptyMessage: t('emptyList'),
    onItemClick: actions.onItemClick,
  });

  const toolbar = document.createElement('div');
  toolbar.className = 'text-list-card__toolbar';

  const leftActions = document.createElement('div');
  leftActions.className = 'text-list-card__toolbar-left';
  const undoButton = createIconButton({ label: t('undo'), onClick: actions.onUndo, disabled: !state.canUndo });
  const deleteButton = createButton({
    label: t('delete'),
    variant: 'outline',
    onClick: actions.onDeleteSelected,
    disabled: state.selectedIds.size === 0,
  });
  leftActions.append(undoButton, deleteButton);

  const addButton = createButton({ label: t('add'), variant: 'primary', onClick: actions.onOpenAddModal });

  toolbar.append(leftActions, addButton);
  card.append(header, title, description, listBox, toolbar);

  return card;
}
