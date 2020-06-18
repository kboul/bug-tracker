import store from './store';
import {
    loadBugs,
    addBug,
    resolveBug,
    assignBugToUser
} from './store/bugs/actions';
import { loadUsers } from './store/users/action';
import { unresolvedBugs, bugsByUser } from './store/utils';

// const bugsByUser1 = bugsByUser(1)(store.getState());

store.dispatch(loadUsers());
store.dispatch(loadBugs());

store.subscribe(() => {
    buildTable();
    buildUnresolvedBugs();
});

const buildUnresolvedBugs = () => {
    const unresolvedBugsEl = document.getElementById('unresolvedBugs');
    unresolvedBugsEl.innerHTML = `<b>Active Bugs</b>: ${
        unresolvedBugs(store.getState()).length
    }`;
};

const buildTable = () => {
    const bugs = store.getState().entities.bugs.list;
    if (bugs.length === 0) return;

    const bugsTable = document.getElementById('bugsTable');
    if (bugsTable.children.length > 0) bugsTable.innerHTML = '';
    bugsTable.append();

    const tr = document.createElement('tr');
    bugsTable.appendChild(tr);

    Object.keys(bugs[0]).forEach(bugProp => {
        const th = createTh(tableCellThValue(bugProp));
        tr.appendChild(th);
    });

    const emptyTh = createTh('');
    tr.appendChild(emptyTh);

    bugs.forEach((bug, index) => {
        const tr = document.createElement('tr');
        bugsTable.appendChild(tr);

        Object.keys(bugs[index]).forEach(bugKey => {
            const td = document.createElement('td');
            const bugValue = bug[bugKey];
            td.appendChild(
                document.createTextNode(tableCellTdValue(bugKey, bugValue))
            );
            tr.appendChild(td);
        });

        const resolveBtn = document.createElement('button');
        resolveBtn.innerHTML = bug.resolved ? 'unresolve' : 'resolve';
        resolveBtn.addEventListener('click', () => {
            store.dispatch(resolveBug(bug.id, !bug.resolved));
        });

        const td = document.createElement('td');
        td.appendChild(resolveBtn);
        tr.appendChild(td);
    });
};

const createTh = textNode => {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(textNode));
    return th;
};

/**
 *
 * @param {string} bugKey
 * @param {any} bugValue
 * @returns {string}
 */

const tableCellTdValue = (bugKey, bugValue) => {
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
 * @param {string} bugProp
 * @returns {string}
 */

const tableCellThValue = bugProp =>
    bugProp === 'userId' ? 'assigned to' : bugProp;

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

// setTimeout(() => store.dispatch(assignBugToUser(4, 4)), 5000);
