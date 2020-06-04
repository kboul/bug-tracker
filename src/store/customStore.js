import reducer from './reducer';

const createStore = reducer => {
    let state;
    let listeners = [];

    const subscribe = listener => {
        listeners.push(listener);
    };

    const dispatch = action => {
        state = reducer(state, action);

        listeners.forEach(lis => lis());
    };

    const getState = () => {
        return state;
    };

    return { subscribe, dispatch, getState };
};

export default createStore(reducer);
