import store from './store';
// import store from './customStore';
import {
    bugAdded,
    bugResolved,
    bugAssignedToUser,
    loadBugs
} from './store/bugs/actions';
import { projectAdded } from './store/projects/actions';
import { userAdded } from './store/users/action';
import { unresolvedBugs, bugsByUser } from './store/utils';
import { apiCallBegan } from './store/api/actions';
import types from './store/bugs/actionTypes';

// console.log(store.getState());

// const unsuscribe = store.subscribe(() => {
//     console.log('Store changed', store.getState());
// });

// store.dispatch(userAdded({ name: 'User 1' }));
// store.dispatch(userAdded({ name: 'User 2' }));
// store.dispatch(userAdded({ name: 'User 3' }));

// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// // // unsuscribe();

// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(projectAdded({ name: 'Project 1' }));

// // store.dispatch({ type: 'error', payload: { message: 'An error occured' } });

// const unresolvedbugs = unresolvedBugs(store.getState());

// const bugsByUser1 = bugsByUser(1)(store.getState());

// console.log(unresolvedbugs);
// console.log(bugsByUser1);

store.dispatch(loadBugs());
