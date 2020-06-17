import types from './actionTypes';

const initialState = {
    list: [],
    loading: false,
    lastFetch: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userAdded: {
            return {
                ...state,
                list: [...state.list, { ...action.payload }]
            };
        }
        case types.usersRequested:
            return { ...state, loading: true };
        case types.usersReceived:
            return {
                ...state,
                list: action.payload,
                loading: false,
                lastFetch: Date.now()
            };
        case types.usersRequestFailed:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default reducer;
