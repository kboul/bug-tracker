import axios from 'axios';
import types from '../api/types';
import { apiCallSuccess, apiCallFailed } from '../api/actions';

const api = ({ dispatch }) => next => async action => {
    console.log(action);
    if (action.type !== types.callBegan) return next(action);

    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data
        });
        // General
        dispatch(apiCallSuccess(response.data));
        // Specific
        dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        // General
        dispatch(apiCallFailed(error.message));
        // Specific
        if (onError) dispatch({ type: onError, payload: error.message });
    }
};

export default api;
