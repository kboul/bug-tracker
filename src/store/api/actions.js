import types from './types';

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const apiCallBegan = payload => ({
    type: types.callBegan,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const apiCallSuccess = payload => ({
    type: types.callSuccess,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const apiCallFailed = payload => ({
    type: types.callFailed,
    payload
});

export { apiCallBegan, apiCallSuccess, apiCallFailed };
