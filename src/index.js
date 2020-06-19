import store from './store';
import { loadBugs, addBug, resolveBug } from './store/bugs/actions';
import { loadUsers } from './store/users/action';
import { unresolvedBugs } from './store/utils';
import {
    changeDescription,
    changeUserId,
    changeResolved,
    changePriority,
    clearModalValues
} from './store/ui/actions';
import { createTh, tableCellThValue, tableCellTdValue } from './utils';
import { resolvedValues, priorityValues } from './constants';

store.dispatch(loadUsers());
store.dispatch(loadBugs());

// build dropdown lists with static data

const resolvedEl = document.getElementById('resolved');
const priorityEl = document.getElementById('priority');
const descriptionEl = document.getElementById('description');
const userIdEl = document.getElementById('userId');
const doAddBugBtnEl = document.getElementById('doAddBugBtn');

resolvedValues.forEach(({ name }) => {
    resolvedEl.options[resolvedEl.options.length] = new Option(name, name);
});

priorityValues.forEach(({ name }) => {
    priorityEl.options[priorityEl.options.length] = new Option(name, name);
});

descriptionEl.addEventListener('input', e => {
    store.dispatch(changeDescription({ description: e.target.value }));
    disableDoAddBug();
});

userIdEl.addEventListener('change', e => {
    store.dispatch(changeUserId({ userId: e.target.value }));
});

resolvedEl.addEventListener('change', e => {
    store.dispatch(changeResolved({ resolved: e.target.value }));
});

priorityEl.addEventListener('change', e => {
    store.dispatch(changePriority({ priority: e.target.value }));
});

const disableDoAddBug = () => {
    const description = store.getState().entities.ui.description;
    doAddBugBtnEl.disabled = description === '' ? true : false;
};

// build dropdown list with dynamic data
const buildDescrDropDown = () => {
    const users = store.getState().entities.users.list;
    if (userIdEl.options.length > 0) userIdEl.innerHTML = '';

    users.forEach(({ id, name }) => {
        userIdEl.options[userIdEl.options.length] = new Option(name, id);
    });
};

const updateUI = () => {
    buildTable();
    buildDescrDropDown();
    buildUnresolvedBugs();
    const { userId } = store.getState().entities.ui;
    userIdEl.value = userId;
};
store.subscribe(updateUI);

// event listeners on form els

doAddBugBtnEl.addEventListener('click', () => {
    const {
        description,
        userId,
        resolved,
        priority
    } = store.getState().entities.ui;
    store.dispatch(addBug({ description, userId, resolved, priority }));
    addBugModalEl.style.display = 'none';
});

const buildUnresolvedBugs = () => {
    const unresolvedBugsEl = document.getElementById('unresolvedBugs');
    unresolvedBugsEl.innerHTML = `<b>Unresolved Bugs</b>: ${
        unresolvedBugs(store.getState()).length
    }`;
};

// Table

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

// Modal

const addBugModalEl = document.getElementById('addBugModal');
const addBugBtnEl = document.getElementById('addBugBtn');
const closeBtnEl = document.getElementById('closeBtn');

const openModal = () => (addBugModalEl.style.display = 'block');
const closeModal = () => (addBugModalEl.style.display = 'none');

// Close If Outside Click
const outsideClick = e => {
    if (e.target == addBugModalEl) {
        addBugModalEl.style.display = 'none';
    }
};

addBugBtnEl.addEventListener('click', openModal);
closeBtnEl.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// setTimeout(() => store.dispatch(assignBugToUser(4, 4)), 5000);
// const bugsByUser1 = bugsByUser(1)(store.getState());
