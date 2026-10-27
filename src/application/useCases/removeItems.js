/**
 * @param {{ repository: import('../ports/listRepository.js').ListRepository, history: import('../history.js').History }} deps
 * @param {string[]} ids
 */
export function removeItems({ repository, history }, ids) {
  const current = repository.load();
  history.push(current);
  const next = current.remove(ids);
  repository.save(next);
  return next;
}
