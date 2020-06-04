import types from './actionTypes';

const bugAdded = description => ({
    type: types.bugAdded,
    payload: {
        description
    }
});

const bugRemoved = id => ({
    type: types.bugRemoved,
    payload: {
        id
    }
});

const bugResolved = id => ({
    type: types.bugResolved,
    payload: {
        id
    }
});

export { bugAdded, bugRemoved, bugResolved };
