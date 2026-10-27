import { InMemoryListRepository } from '../infrastructure/inMemoryListRepository.js';
import { History } from '../application/history.js';
import { addItem } from '../application/useCases/addItem.js';
import { removeItems } from '../application/useCases/removeItems.js';
import { undoLastChange } from '../application/useCases/undoLastChange.js';
import { renderTextListCard } from '../features/text-list/TextListFeature.js';
import { openAddItemModal } from '../features/add-item/AddItemFeature.js';
import { createTranslator, loadStoredLocale, storeLocale } from '../i18n/i18n.js';
import { Store } from './store.js';

/** Composition root: ata infraestructura, casos de uso, i18n y UI. */
export function mountApp(root) {
  const repository = new InMemoryListRepository();
  const history = new History();
  const deps = { repository, history };

  const store = new Store({
    list: repository.load(),
    selectedIds: new Set(),
    canUndo: false,
    locale: loadStoredLocale(),
  });

  function toggleSelection(id, multi) {
    const current = new Set(store.getState().selectedIds);
    if (multi) {
      current.has(id) ? current.delete(id) : current.add(id);
    } else {
      current.clear();
      current.add(id);
    }
    store.setState({ selectedIds: current });
  }

  const actions = {
    onItemClick: (id, event) => toggleSelection(id, event.ctrlKey || event.metaKey),
    onDeleteSelected: () => {
      const { selectedIds } = store.getState();
      const list = removeItems(deps, [...selectedIds]);
      store.setState({ list, selectedIds: new Set(), canUndo: history.canUndo });
    },
    onUndo: () => {
      const list = undoLastChange(deps);
      store.setState({ list, selectedIds: new Set(), canUndo: history.canUndo });
    },
    onOpenAddModal: () => {
      const t = createTranslator(store.getState().locale);
      openAddItemModal({
        t,
        onSubmit: (text) => {
          const list = addItem(deps, text);
          store.setState({ list, selectedIds: new Set(), canUndo: history.canUndo });
        },
      });
    },
    onChangeLocale: (locale) => {
      storeLocale(locale);
      store.setState({ locale });
    },
  };

  function render(state) {
    const t = createTranslator(state.locale);
    document.title = t('documentTitle');
    root.replaceChildren(renderTextListCard(state, actions, t));
  }

  store.subscribe(render);
  render(store.getState());
}
