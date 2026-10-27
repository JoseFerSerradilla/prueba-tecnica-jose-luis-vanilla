import { createTextField } from '../../ui/TextField/TextField.js';
import { createButton } from '../../ui/Button/Button.js';
import { openModal } from '../../ui/Modal/Modal.js';
import { EmptyTextError, DuplicateItemError } from '../../domain/errors.js';

/**
 * El dominio lanza errores tipados con mensajes en inglés (su idioma
 * neutral por defecto); aquí es donde se traducen al idioma activo de la
 * UI según su tipo. Un error no reconocido cae en su propio mensaje.
 * @param {Error} err
 * @param {(key: string) => string} t
 */
function translateDomainError(err, t) {
  if (err instanceof EmptyTextError) return t('errorEmpty');
  if (err instanceof DuplicateItemError) return t('errorDuplicate');
  return err.message;
}

/**
 * Abre el modal "Add item to list" y llama a onSubmit(text) cuando el
 * usuario confirma. La validación (texto vacío, duplicados...) vive en el
 * dominio: este formulario solo muestra el mensaje traducido de cualquier
 * error que onSubmit propague, sin duplicar esas reglas aquí.
 * @param {{ onSubmit: (text: string) => void, t: (key: string) => string }} props
 */
export function openAddItemModal({ onSubmit, t }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'add-item-form';

  const titleId = 'add-item-title';
  const title = document.createElement('p');
  title.id = titleId;
  title.className = 'add-item-form__title';
  title.textContent = t('addItemTitle');

  const error = document.createElement('p');
  error.className = 'add-item-form__error';
  error.hidden = true;

  let value = '';
  const field = createTextField({
    placeholder: t('placeholder'),
    ariaLabel: t('addItemTitle'),
    onInput: (v) => {
      value = v;
      error.hidden = true;
    },
    onKeyDown: (e) => {
      if (e.key === 'Enter') submit();
    },
  });

  const actions = document.createElement('div');
  actions.className = 'add-item-form__actions';

  function submit() {
    try {
      onSubmit(value);
      modal.close();
    } catch (err) {
      error.textContent = translateDomainError(err, t);
      error.hidden = false;
    }
  }

  const addButton = createButton({ label: t('add'), variant: 'primary', onClick: submit });
  const cancelButton = createButton({ label: t('cancel'), variant: 'outline', onClick: () => modal.close() });

  actions.append(addButton, cancelButton);
  wrapper.append(title, field, error, actions);

  const modal = openModal({ titleId, content: wrapper });
}
