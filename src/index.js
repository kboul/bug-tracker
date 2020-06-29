import configureStore from './store/configureStore';
import { loadBugs, addBug, removeBug, editBug } from './store/bugs/actions';
import { loadUsers } from './store/users/actions';
import { unresolvedBugs } from './store/utils';
import {
    changeDescription,
    changeUserId,
    changeResolved,
    changePriority,
    changeModalValues,
    resetModalValues
} from './store/modal/actions';
import { createTh, tableCellThValue, tableCellTdValue } from './utils';
import consts from './constants';

export const store = configureStore();

store.dispatch(loadUsers());
store.dispatch(loadBugs());

const descriptionEl = document.getElementById('description');
const userIdEl = document.getElementById('userId');
const resolvedEl = document.getElementById('resolved');
const priorityEl = document.getElementById('priority');
const addOrEditBugBtnEl = document.getElementById('addOrEditBugBtn');
const bugModalEl = document.getElementById('bugModal');
const addBugBtnEl = document.getElementById('addBugBtn');
const closeBtnEl = document.getElementById('closeBtn');
const bugModalHeaderEl = document.getElementById('bugModalHeader');
const bugsTableEl = document.getElementById('bugsTable');
const loaderEl = document.getElementById('loader');

// build dropdown lists with static data
consts.resolvedValues.forEach(({ key, value }) => {
    resolvedEl.options[resolvedEl.options.length] = new Option(key, value);
});

consts.priorityValues.forEach(({ key, value }) => {
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
    } = store.getState().entities.modal;
    descriptionEl.value = description;
    userIdEl.value = userId;
    resolvedEl.value = resolved;
    priorityEl.value = priority;
};
store.subscribe(updateUI);

// Table
const buildTable = () => {
    const { list: bugs, loading, lastFetch } = store.getState().entities.bugs;
    loaderEl.style.display = loading ? 'block' : 'none';

    if (!lastFetch) return;

    if (bugsTableEl.children.length > 0) bugsTableEl.innerHTML = '';
    bugsTableEl.append();

    const tr = document.createElement('tr');
    bugsTableEl.appendChild(tr);

    if (!bugs.length) return;

    Object.keys(bugs[0]).forEach(bugProp => {
        const th = createTh(tableCellThValue(bugProp));
        tr.appendChild(th);
    });

    const editBugITh = createTh('');
    tr.appendChild(editBugITh);
    const deleteBugITh = createTh('');
    tr.appendChild(deleteBugITh);

    bugs.forEach((bug, index) => {
        const tr = document.createElement('tr');
        bugsTableEl.appendChild(tr);

        Object.keys(bugs[index]).forEach(bugKey => {
            const td = document.createElement('td');
            const bugValue = bug[bugKey];
            td.appendChild(
                document.createTextNode(tableCellTdValue(bugKey, bugValue))
            );
            tr.appendChild(td);
        });

        const editBugI = document.createElement('i');
        editBugI.className = 'fa fa-pencil';
        editBugI.addEventListener('click', () => {
            const selectedBug = bugs.find(b => b.id === bug.id);
            store.dispatch(changeModalValues(selectedBug));
            bugModalHeaderEl.innerHTML = consts.modalHeaderEdit;
            addOrEditBugBtnEl.innerHTML = consts.modalButtonEdit;
            validateBugForm();
            openModal();
        });

        const editBugITd = document.createElement('td');
        editBugITd.appendChild(editBugI);
        tr.appendChild(editBugITd);

        const deleteBugI = document.createElement('i');
        deleteBugI.className = 'fa fa-trash';
        deleteBugI.addEventListener('click', () => {
            store.dispatch(removeBug(bug.id));
        });

        const deleteBugITd = document.createElement('td');
        deleteBugITd.appendChild(deleteBugI);
        tr.appendChild(deleteBugITd);
    });
};

const buildUnresolvedBugs = () => {
    const unresolvedBugsEl = document.getElementById('unresolvedBugs');
    unresolvedBugsEl.innerHTML = `${consts.unresolvedBugs}: ${
        unresolvedBugs(store.getState()).length
    }`;
};

// Modal

// add event listeners to modal form elements

descriptionEl.addEventListener('input', e => {
    store.dispatch(changeDescription({ description: e.target.value }));
    validateBugForm();
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

addOrEditBugBtnEl.addEventListener('click', () => {
    const {
        description,
        userId,
        resolved,
        priority
    } = store.getState().entities.modal;
    const modalHeader = bugModalHeaderEl.innerHTML;
    if (modalHeader === consts.modalHeaderEdit) {
        store.dispatch(editBug(store.getState().entities.modal));
    } else {
        store.dispatch(addBug({ description, userId, resolved, priority }));
        store.dispatch(resetModalValues());
    }
    bugModalEl.style.display = 'none';
});

const validateBugForm = () => {
    const description = store.getState().entities.modal.description;
    addOrEditBugBtnEl.disabled = description === '' ? true : false;
};

const openModal = () => (bugModalEl.style.display = 'block');
const closeModal = () => (bugModalEl.style.display = 'none');

// Close modal if Outside Click
const outsideClick = e => {
    if (e.target == bugModalEl) {
        bugModalEl.style.display = 'none';
    }
};

addBugBtnEl.addEventListener('click', () => {
    store.dispatch(resetModalValues());
    bugModalHeaderEl.innerHTML = consts.modalHeaderAdd;
    addOrEditBugBtnEl.innerHTML = consts.modalButtonAdd;
    openModal();
});
closeBtnEl.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// setTimeout(() => store.dispatch(assignBugToUser(4, 4)), 5000);
// const bugsByUser1 = bugsByUser(1)(store.getState());
