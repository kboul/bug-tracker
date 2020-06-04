import { createSelector } from 'reselect';

/**
 * Memoization => get unresolved bugs from the cache
 * @param {Object} state
 * @returns {Object[]}
 */

const unresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(({ resolved }) => !resolved)
);

export { unresolvedBugs };
