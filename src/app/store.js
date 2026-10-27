/**
 * Observable mínimo (patrón Observer) para notificar a la UI cuando
 * cambia el estado de la aplicación (lista + selección), sin necesidad
 * de un framework.
 */
export class Store {
  #state;
  #listeners = new Set();

  constructor(initialState) {
    this.#state = initialState;
  }

  getState() {
    return this.#state;
  }

  setState(partial) {
    this.#state = { ...this.#state, ...partial };
    this.#listeners.forEach((listener) => listener(this.#state));
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }
}
