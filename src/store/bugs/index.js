import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';

import { apiCallBegan } from '../api';

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        // actions => action handlers
        bugsRequested: bugs => {
            bugs.loading = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugsRequestFailed: bugs => {
            bugs.loading = false;
        },
        bugAssignedtoUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload);
        },
        bugEdited: (bugs, action) => {
            const index = bugs.list.findIndex(
                bug => bug.id === action.payload.id
            );
            bugs.list[index] = action.payload;
        },
        bugRemoved: (bugs, action) => {
            bugs.list = bugs.list.filter(({ id }) => id !== action.payload.id);
        }
    }
});

export const {
    bugsRequested,
    bugsReceived,
    bugsRequestFailed,
    bugAssignedtoUser,
    bugAdded,
    bugEdited,
    bugRemoved
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/bugs';

/**
 *
 * @returns {Object}
 */

const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;

    // here we return a function not an object because it is a thunk
    // in order not to get undefined in oput tests we need to return the function
    return dispatch(
        apiCallBegan({
            url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type
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
        onSuccess: bugAdded.type
    });

/**
 *
 * @param {Object} bug
 * @returns {Object}
 */

const editBug = bug =>
    apiCallBegan({
        url: `${url}/${bug.id}`,
        method: 'put',
        data: bug,
        onSuccess: bugEdited.type
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
        onSuccess: bugAssignedtoUser.type
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
        onSuccess: bugRemoved.type
    });

export { loadBugs, addBug, editBug, assignBugToUser, removeBug };

// Selector

/**
 * Memoization => get unresolved bugs from the cache
 * @param {Object} state
 * @returns {Object[]}
 */

const unresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(({ resolved }) => !resolved)
);

/**
 *
 * @param {number} userid
 * @returns {Function} - call it using currying
 */

const bugsByUser = userid =>
    createSelector(
        state => state.entities.bugs,
        bugs => bugs.list.filter(({ userId }) => userId === userid)
    );

export { unresolvedBugs, bugsByUser };
