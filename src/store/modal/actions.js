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

const changeModalValues = payload => ({
    type: types.modalValuesChanged,
    payload
});

/**
 *
 * @returns {Object}
 */

const resetModalValues = () => ({
    type: types.modalValuesReset
});

export {
    changeDescription,
    changeUserId,
    changeResolved,
    changePriority,
    changeModalValues,
    resetModalValues
};
