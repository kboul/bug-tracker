import { combineReducers } from 'redux';

import bugsReducer from './bugs/reducer';
import usersReducer from './users/reducer';
import modalReducer from './modal/reducer';

export default combineReducers({
    bugs: bugsReducer,
    users: usersReducer,
    modal: modalReducer
});
