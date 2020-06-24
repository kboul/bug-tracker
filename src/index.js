import store from './store';
import { loadBugs, addBug, resolveBug } from './store/bugs/actions';
import { loadUsers } from './store/users/action';
import { unresolvedBugs } from './store/utils';
import {
    changeDescription,
    changeUserId,
    changeResolved,
    changePriority,
    resetModalValues
} from './store/ui/actions';
import { createTh, tableCellThValue, tableCellTdValue } from './utils';
import { resolvedValues, priorityValues } from './constants';

store.dispatch(loadUsers());
store.dispatch(loadBugs());

const descriptionEl = document.getElementById('description');
const userIdEl = document.getElementById('userId');
const resolvedEl = document.getElementById('resolved');
const priorityEl = document.getElementById('priority');
const doAddBugBtnEl = document.getElementById('doAddBugBtn');
const addBugModalEl = document.getElementById('addBugModal');
const addBugBtnEl = document.getElementById('addBugBtn');
const closeBtnEl = document.getElementById('closeBtn');

// build dropdown lists with static data
resolvedValues.forEach(({ key, value }) => {
    resolvedEl.options[resolvedEl.options.length] = new Option(key, value);
});

priorityValues.forEach(({ key, value }) => {
    priorityEl.options[priorityEl.options.length] = new Option(key, value);
});

// build dropdown list with dynamic data
const buildDescrDropDown = () => {
    const users = store.getState().entities.users.list;
    if (userIdEl.options.length > 0) userIdEl.innerHTML = '';

    users.forEach(({ id, name }) => {
        userIdEl.options[userIdEl.options.length] = new Option(name, id);
    });
};

// Update UI
const updateUI = () => {
    buildTable();
    buildDescrDropDown();
    buildUnresolvedBugs();
    const {
        description,
        userId,
        resolved,
        priority
    } = store.getState().entities.ui;
    descriptionEl.value = description;
    userIdEl.value = userId;
    resolvedEl.value = resolved;
    priorityEl.value = priority;
};
store.subscribe(updateUI);

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

const buildUnresolvedBugs = () => {
    const unresolvedBugsEl = document.getElementById('unresolvedBugs');
    unresolvedBugsEl.innerHTML = `<b>Unresolved Bugs</b>: ${
        unresolvedBugs(store.getState()).length
    }`;
};

// Modal

// add event listeners to modal form elements

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

doAddBugBtnEl.addEventListener('click', () => {
    const {
        description,
        userId,
        resolved,
        priority
    } = store.getState().entities.ui;
    store.dispatch(addBug({ description, userId, resolved, priority }));
    store.dispatch(resetModalValues());
    addBugModalEl.style.display = 'none';
});

const disableDoAddBug = () => {
    const description = store.getState().entities.ui.description;
    doAddBugBtnEl.disabled = description === '' ? true : false;
};

const openModal = () => (addBugModalEl.style.display = 'block');
const closeModal = () => (addBugModalEl.style.display = 'none');

// Close modal if Outside Click
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
