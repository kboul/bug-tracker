import types from './actionTypes';

let lastId = 0;

const initialState = {
    list: [],
    loading: false,
    lastFetch: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.bugAdded: {
            const { description } = action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: ++lastId,
                        description,
                        resolved: false
                    }
                ]
            };
        }
        case types.bugRemoved: {
            const list = state.list.filter(
                ({ id }) => id !== action.payload.id
            );
            return {
                ...state,
                list
            };
        }
        case types.bugResolved: {
            const { id } = action.payload;
            const list = state.list.map(bug =>
                bug.id === id ? { ...bug, resolved: true } : bug
            );
            return { ...state, list };
        }
        case types.bugAssignedtoUser: {
            const { bugId, userId } = action.payload;
            const list = state.list.map(bug =>
                bug.id === bugId ? { ...bug, userId } : bug
            );
            return { ...state, list };
        }
        case types.bugsReceived:
            return { ...state, list: action.payload, loading: false };
        case types.bugsRequested:
            return { ...state, loading: true };
        case types.bugsRequestFailed:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default reducer;
