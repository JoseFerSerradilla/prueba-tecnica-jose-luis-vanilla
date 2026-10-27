/**
 * Memento simplificado: pila de snapshots de TextList para poder deshacer
 * N cambios (el enunciado solo pide 1, lo ampliamos porque reutiliza el
 * mismo mecanismo sin coste extra).
 */
export class History {
  #stack = [];

  push(list) {
    this.#stack.push(list);
  }

  pop() {
    return this.#stack.pop() ?? null;
  }

  get canUndo() {
    return this.#stack.length > 0;
  }
}
