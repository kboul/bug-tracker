import types from './actionTypes';

let lastId = 0;

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.bugAdded: {
            const { description } = action.payload;
            return [
                ...state,
                {
                    id: ++lastId,
                    description,
                    resolved: false
                }
            ];
        }
        case types.bugRemoved:
            return state.filter(({ id }) => id !== action.payload.id);
        case types.bugResolved: {
            const { id } = action.payload;
            const bugs = state.map(bug =>
                bug.id === id ? { ...bug, resolved: true } : bug
            );
            return bugs;
        }
        case types.bugAssignedtoUser: {
            const { bugId, userId } = action.payload;
            const bugs = state.map(bug =>
                bug.id === bugId ? { ...bug, userId } : bug
            );
            return bugs;
        }
        default:
            return state;
    }
};

export default reducer;
