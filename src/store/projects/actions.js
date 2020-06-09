import types from './actionTypes';

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const projectAdded = payload => ({
    type: types.projectAdded,
    payload
});

export { projectAdded };
