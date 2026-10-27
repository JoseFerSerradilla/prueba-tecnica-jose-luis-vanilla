/**
 * @param {{ repository: import('../ports/listRepository.js').ListRepository, history: import('../history.js').History }} deps
 */
export function undoLastChange({ repository, history }) {
  const previous = history.pop();
  if (!previous) return repository.load();
  repository.save(previous);
  return previous;
}
