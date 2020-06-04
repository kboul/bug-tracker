import { combineReducers } from 'redux';

import bugsReducer from './bugs/reducer';
import projectsReducer from './projects/reducer';
import usersReducer from './users/reducer';

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    users: usersReducer
});
