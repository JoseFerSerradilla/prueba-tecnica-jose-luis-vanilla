// Self-check manual de dominio + casos de uso (sin framework de test).
// Ejecutar con: node scripts/selfcheck.mjs
import assert from 'node:assert/strict';
import { TextList } from '../src/domain/textList.js';
import { EmptyTextError, DuplicateItemError } from '../src/domain/errors.js';
import { InMemoryListRepository } from '../src/infrastructure/inMemoryListRepository.js';
import { History } from '../src/application/history.js';
import { addItem } from '../src/application/useCases/addItem.js';
import { removeItems } from '../src/application/useCases/removeItems.js';
import { undoLastChange } from '../src/application/useCases/undoLastChange.js';

// 1. No se pueden añadir entradas vacías.
assert.throws(() => new TextList().add('   '), EmptyTextError);

// 2. No se puede borrar sin selección.
assert.throws(() => new TextList().add('item 1').remove([]));

// 2b. No se pueden añadir dos items con el mismo texto (sin distinguir
// mayúsculas/minúsculas ni espacios al borde).
assert.throws(() => new TextList().add('Item 1').add('item 1  '), DuplicateItemError);

// 3. Añadir y borrar funciona a través de los casos de uso.
const repository = new InMemoryListRepository();
const history = new History();
const deps = { repository, history };

let list = addItem(deps, 'Item 1');
list = addItem(deps, 'Item 2');
assert.equal(list.toArray().length, 2);

const [first] = list.toArray();
list = removeItems(deps, [first.id]);
assert.equal(list.toArray().length, 1);
assert.equal(list.toArray()[0].text, 'Item 2');

// 4. Undo restaura el estado anterior al borrado.
list = undoLastChange(deps);
assert.equal(list.toArray().length, 2);

// 5. Undo es apilable (varios niveles).
list = undoLastChange(deps); // deshace el "Item 2"
assert.equal(list.toArray().length, 1);
list = undoLastChange(deps); // deshace el "Item 1"
assert.equal(list.toArray().length, 0);
assert.equal(history.canUndo, false);

// 6. El caso de uso addItem también rechaza duplicados (propaga el error
// del dominio sin añadir el item ni tocar el repositorio).
list = addItem(deps, 'Item 1');
assert.throws(() => addItem(deps, 'Item 1'), DuplicateItemError);
assert.equal(repository.load().toArray().length, 1);

console.log('selfcheck OK: todas las invariantes de dominio y casos de uso se cumplen.');
