import store from './store';
// import store from './customStore';
import {
    loadBugs,
    addBug,
    resolveBug,
    assignBugToUser
} from './store/bugs/actions';
import { loadUsers } from './store/users/action';
// import { projectAdded } from './store/projects/actions';
// import { userAdded } from './store/users/action';
// import { unresolvedBugs, bugsByUser } from './store/utils';

// console.log(store.getState());

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
store.dispatch(loadUsers());
store.dispatch(loadBugs());

store.subscribe(() => {
    buildTable();
});

const buildTable = () => {
    const bugs = store.getState().entities.bugs.list;
    if (bugs.length === 0) return;

    const bugsTable = document.getElementById('bugsTable');
    bugsTable.append();

    const tr = document.createElement('tr');
    bugsTable.appendChild(tr);

    Object.keys(bugs[0]).forEach(bugProp => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(bugProp));
        tr.appendChild(th);
    });

    bugs.forEach((bug, index) => {
        const tr = document.createElement('tr');
        bugsTable.appendChild(tr);

        Object.keys(bugs[index]).forEach(bugKey => {
            const td = document.createElement('td');
            const bugValue = bug[bugKey];
            td.appendChild(
                document.createTextNode(tableCellValue(bugKey, bugValue))
            );
            tr.appendChild(td);
        });
    });
};

/**
 *
 * @param {string} bugKey
 * @param {any} bugValue
 * @returns {string}
 */

const tableCellValue = (bugKey, bugValue) => {
    switch (bugKey) {
        case 'userId':
            return userIdToName(bugValue);
        case 'resolved':
            return resolvedBoolToStr(bugValue);
        default:
            return bugValue;
    }
};

/**
 *
 * @param {bool} bugValue
 * @returns {string}
 */

const resolvedBoolToStr = bugValue => (bugValue ? 'yes' : 'no');

/**
 *
 * @param {number | null} bugValue
 * @returns {string}
 */

const userIdToName = bugValue => {
    const users = store.getState().entities.users.list;
    if (bugValue) return users[bugValue].name;
    return '-';
};

// setTimeout(() => store.dispatch(addBug({ description: 'new bug' })), 4000);

// setTimeout(() => store.dispatch(resolveBug(2)), 2000);

// setTimeout(() => store.dispatch(assignBugToUser(4, 4)), 5000);
