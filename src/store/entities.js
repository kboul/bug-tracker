import { combineReducers } from 'redux';

import bugsReducer from './bugs/reducer';
import usersReducer from './users/reducer';
import uiReducer from './ui/reducer';

export default combineReducers({
    bugs: bugsReducer,
    users: usersReducer,
    ui: uiReducer
});
