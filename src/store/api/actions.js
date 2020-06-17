import types from './actionTypes';

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const apiCallBegan = payload => ({
    type: types.apiCallBegan,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const apiCallSuccess = payload => ({
    type: types.apiCallSuccess,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const apiCallFailed = payload => ({
    type: types.apiCallFailed,
    payload
});

export { apiCallBegan, apiCallSuccess, apiCallFailed };
