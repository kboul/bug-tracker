import moment from 'moment';
import types from './actionTypes';
import { apiCallBegan } from '../api/actions';

const url = '/bugs';

/**
 *
 * @returns {Object}
 */

const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;

    dispatch(
        apiCallBegan({
            url,
            onStart: types.bugsRequested,
            onSuccess: types.bugsReceived,
            onError: types.bugsRequestFailed
        })
    );
};

/**
 *
 * @param {Object} bug
 * @returns {Object}
 */

const addBug = bug =>
    apiCallBegan({
        url,
        method: 'post',
        data: bug,
        onSuccess: types.bugAdded
    });

/**
 *
 * @param {number} id
 * @param {bool} resolved
 * @returns {Object}
 */

const resolveBug = (id, resolved) =>
    apiCallBegan({
        url: `${url}/${id}`,
        method: 'patch',
        data: { resolved },
        onSuccess: types.bugResolved
    });

/**
 *
 * @param {number} bugId
 * @param {number} userId
 * @returns {Object}
 */

const assignBugToUser = (bugId, userId) =>
    apiCallBegan({
        url: `${url}/${bugId}`,
        method: 'patch',
        data: { userId }, // what we add on the server payload response
        onSuccess: types.bugAssignedtoUser
    });

/**
 *
 * @param {number} id
 * @returns {Object}
 */

const removeBug = id =>
    apiCallBegan({
        url: `${url}/${id}`,
        method: 'delete',
        data: {},
        onSuccess: types.bugRemoved
    });

export { loadBugs, addBug, resolveBug, assignBugToUser, removeBug };
