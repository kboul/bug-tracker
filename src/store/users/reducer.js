import types from './actionTypes';

let lastId = 0;

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.userAdded: {
            const { name } = action.payload;
            return [
                ...state,
                {
                    id: ++lastId,
                    name
                }
            ];
        }
        default:
            return state;
    }
};

export default reducer;
