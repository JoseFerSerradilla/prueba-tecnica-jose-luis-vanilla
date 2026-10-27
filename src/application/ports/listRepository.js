/**
 * Puerto (DIP): contrato que debe cumplir cualquier adaptador de
 * persistencia de la lista. La capa de aplicación depende de esta
 * abstracción, nunca de una implementación concreta.
 * @interface
 */
export class ListRepository {
  /** @returns {import('../../domain/textList.js').TextList} */
  load() {
    throw new Error('ListRepository.load() no implementado');
  }

  /** @param {import('../../domain/textList.js').TextList} list */
  save(list) {
    throw new Error('ListRepository.save() no implementado');
  }
}
