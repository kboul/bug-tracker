import types from './actionTypes';

let lastId = 0;

const projectAdded = name => ({
    type: types.projectAdded,
    payload: {
        id: ++lastId,
        name
    }
});

export { projectAdded };
