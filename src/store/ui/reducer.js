import types from './actionTypes';
import { resolvedValues, priorityValues } from '../../constants';
import { unFormatResolvedValue } from '../../utils';

const initialState = {
    description: '',
    userId: 1,
    resolved: unFormatResolvedValue(resolvedValues[0].name),
    priority: priorityValues[0].name
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
            resolved = unFormatResolvedValue(resolved);
            return { ...state, resolved };
        }
        case types.priorityChanged: {
            let { priority } = action.payload;
            priority = priority === 'low' ? 1 : priority === 'medium' ? 2 : 3;
            return { ...state, priority };
        }
        case types.clearModalValues:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
