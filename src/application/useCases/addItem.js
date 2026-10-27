/**
 * @param {{ repository: import('../ports/listRepository.js').ListRepository, history: import('../history.js').History }} deps
 * @param {string} text
 */
export function addItem({ repository, history }, text) {
  const current = repository.load();
  history.push(current);
  const next = current.add(text);
  repository.save(next);
  return next;
}
