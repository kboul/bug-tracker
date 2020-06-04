import types from './actionTypes';

let lastId = 0;

const userAdded = name => ({
    type: types.userAdded,
    payload: {
        id: ++lastId,
        name
    }
});

export { userAdded };
