import types from './actionTypes';
import { apiCallBegan } from '../api/actions';

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

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const bugReceived = payload => ({
    type: types.bugsReceived,
    payload
});

/**
 *
 * @returns {Function}
 */

const loadBugs = () =>
    apiCallBegan({
        url: '/bugs',
        onStart: types.bugsRequested,
        onSuccess: types.bugsReceived,
        onError: types.bugsRequestFailed
    });

export {
    bugAdded,
    bugRemoved,
    bugResolved,
    bugAssignedToUser,
    bugReceived,
    loadBugs
};
