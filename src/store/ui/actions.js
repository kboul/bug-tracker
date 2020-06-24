import types from './actionTypes';

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const changeDescription = payload => ({
    type: types.descriptionChanged,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const changeUserId = payload => ({
    type: types.userIdChanged,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const changeResolved = payload => ({
    type: types.resolvedChanged,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const changePriority = payload => ({
    type: types.priorityChanged,
    payload
});

/**
 *
 * @param {Object} payload
 * @returns {Object}
 */

const resetModalValues = () => ({
    type: types.resetModalValues
});

export {
    changeDescription,
    changeUserId,
    changeResolved,
    changePriority,
    resetModalValues
};
