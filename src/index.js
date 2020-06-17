import store from './store';
// import store from './customStore';
import {
    loadBugs,
    addBug,
    resolveBug,
    assignBugToUser
} from './store/bugs/actions';
import { projectAdded } from './store/projects/actions';
import { userAdded } from './store/users/action';
import { unresolvedBugs, bugsByUser } from './store/utils';

// console.log(store.getState());

// const unsuscribe = store.subscribe(() => {
//     console.log('Store changed', store.getState());
// });

// store.dispatch(userAdded({ name: 'User 1' }));
// store.dispatch(userAdded({ name: 'User 2' }));
// store.dispatch(userAdded({ name: 'User 3' }));

// // // unsuscribe();

// store.dispatch(projectAdded({ name: 'Project 1' }));

// // store.dispatch({ type: 'error', payload: { message: 'An error occured' } });

// const unresolvedbugs = unresolvedBugs(store.getState());

// const bugsByUser1 = bugsByUser(1)(store.getState());

// console.log(unresolvedbugs);
// console.log(bugsByUser1);
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(addBug({ description: 'new bug' })), 4000);

setTimeout(() => store.dispatch(resolveBug(2)), 2000);

setTimeout(() => store.dispatch(assignBugToUser(4, 4)), 5000);
