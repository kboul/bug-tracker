import types from './actionTypes';
import consts from '../../constants';

const initialState = {
    description: '',
    userId: 1,
    resolved: consts.resolvedValues[0].value,
    priority: consts.priorityValues[0].value
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
        case types.modalValuesChanged:
            return { ...state, ...action.payload };
        case types.modalValuesReset:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
