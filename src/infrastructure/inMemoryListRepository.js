import { ListRepository } from '../application/ports/listRepository.js';
import { TextList } from '../domain/textList.js';

/** Adaptador: implementación en memoria del puerto ListRepository. */
export class InMemoryListRepository extends ListRepository {
  #list = new TextList();

  load() {
    return this.#list;
  }

  save(list) {
    this.#list = list;
  }
}
