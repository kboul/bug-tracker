import axios from 'axios';
import types from '../api/actionTypes';
import { apiCallSuccess, apiCallFailed } from '../api/actions';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== types.apiCallBegan) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

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
