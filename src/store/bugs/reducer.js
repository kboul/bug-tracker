import types from './actionTypes';

let lastId = 0;

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.bugAdded:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

        case types.bugRemoved:
            return state.filter(({ id }) => id !== action.payload.id);
        case types.bugResolved: {
            const bugs = state.map(bug =>
                bug.id === action.payload.id ? { ...bug, resolved: true } : bug
            );
            return bugs;
        }
        default:
            return state;
    }
};

export default reducer;
