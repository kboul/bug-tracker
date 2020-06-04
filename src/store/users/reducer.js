import types from './actionTypes';

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.userAdded:
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name
                }
            ];
        default:
            return state;
    }
};

export default reducer;
