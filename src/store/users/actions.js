import moment from 'moment';
import types from './actionTypes';
import { apiCallBegan } from '../api/actions';

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
            onStart: types.usersRequested,
            onSuccess: types.usersReceived,
            onError: types.usersRequestFailed
        })
    );
};

export { loadUsers };
