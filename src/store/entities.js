import { combineReducers } from 'redux';

import bugsReducer from './bugs';
import usersReducer from './users';
import modalReducer from './modal';

export default combineReducers({
    bugs: bugsReducer,
    users: usersReducer,
    modal: modalReducer
});
