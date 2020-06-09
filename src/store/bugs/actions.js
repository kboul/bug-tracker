import types from './actionTypes';

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const bugAdded = payload => ({
    type: types.bugAdded,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const bugRemoved = payload => ({
    type: types.bugRemoved,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const bugResolved = payload => ({
    type: types.bugResolved,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const bugAssignedToUser = payload => ({
    type: types.bugAssignedtoUser,
    payload
});

export { bugAdded, bugRemoved, bugResolved, bugAssignedToUser };
