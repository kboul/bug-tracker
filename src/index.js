import store from './store';
// import store from './customStore';
import { bugAdded, bugResolved } from './store/bugs/actions';
import { projectAdded } from './store/projects/actions';
import { userAdded } from './store/users/action';

console.log(store.getState());

const unsuscribe = store.subscribe(() => {
    console.log('Store changed', store.getState());
});

store.dispatch(bugAdded('Bug 1'));
store.dispatch(bugAdded('Bug 2'));
store.dispatch(bugAdded('Bug 3'));

// unsuscribe();

store.dispatch(bugResolved(1));

store.dispatch(projectAdded('Project 1'));

store.dispatch(userAdded('User 1'));

store.dispatch(userAdded('User 2'));

store.dispatch(userAdded('User 3'));
