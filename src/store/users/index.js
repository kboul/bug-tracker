import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { apiCallBegan } from '../api';

const slice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        usersRequested: users => {
            users.loading = true;
        },
        usersReceived: (users, action) => {
            users.list = action.payload;
            users.loading = false;
            users.lastFetch = Date.now();
        },
        usersRequestFailed: users => {
            users.loading = false;
        }
    }
});

export const {
    usersRequested,
    usersReceived,
    usersRequestFailed
} = slice.actions;
export default slice.reducer;

const url = '/users';

/**
 *
 * @returns {Object}
 */

const loadUsers = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.users;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;

    return dispatch(
        apiCallBegan({
            url,
            onStart: usersRequested.type,
            onSuccess: usersReceived.type,
            onError: usersRequestFailed.type
        })
    );
};

export { loadUsers };
