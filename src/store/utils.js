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

/**
 *
 * @param {number} userid
 * @returns {Function} - call it using currying
 */

const bugsByUser = userid =>
    createSelector(
        state => state.entities.bugs,
        bugs => bugs.filter(({ userId }) => userId === userid)
    );

export { unresolvedBugs, bugsByUser };
