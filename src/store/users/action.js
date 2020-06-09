import types from './actionTypes';

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const userAdded = payload => ({
    type: types.userAdded,
    payload
});

export { userAdded };
