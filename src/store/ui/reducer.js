import types from './actionTypes';
import { resolvedValues, priorityValues } from '../../constants';

const initialState = {
    description: '',
    userId: 1,
    resolved: resolvedValues[0].value,
    priority: priorityValues[0].value
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.descriptionChanged:
            return { ...state, description: action.payload.description };
        case types.userIdChanged: {
            const { userId } = action.payload;
            return { ...state, userId: parseInt(userId) };
        }
        case types.resolvedChanged: {
            let { resolved } = action.payload;
            resolved = resolved === 'true' ? true : false;
            return { ...state, resolved };
        }
        case types.priorityChanged: {
            let { priority } = action.payload;
            priority = Number(priority);
            return { ...state, priority };
        }
        case types.resetModalValues:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
