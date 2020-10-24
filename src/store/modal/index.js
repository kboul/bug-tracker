import { createAction, createSlice } from '@reduxjs/toolkit';
import consts from '../../constants';

const initialState = {
    description: '',
    userId: 1,
    resolved: consts.resolvedValues[0].value,
    priority: consts.priorityValues[0].value
};

const slice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        descriptionChanged: (modal, action) => {
            modal.description = action.payload.description;
        },
        userIdChanged: (modal, action) => {
            modal.userId = parseInt(action.payload.userId);
        },
        resolvedChanged: (modal, action) => {
            let { resolved } = action.payload;
            resolved = resolved === 'true' ? true : false;
            modal.resolved = resolved;
        },
        priorityChanged: (modal, action) => {
            let { priority } = action.payload;
            priority = Number(priority);
            modal.priority = priority;
        },
        modalValuesChanged: (modal, action) => {
            Object.keys(action.payload).forEach(key => {
                modal[key] = action.payload[key];
            });
        },
        modalValuesReset: () => initialState
    }
});

export const {
    descriptionChanged,
    userIdChanged,
    resolvedChanged,
    priorityChanged,
    modalValuesChanged,
    modalValuesReset
} = slice.actions;
export default slice.reducer;

const changeDescription = createAction(descriptionChanged.type);
const changeUserId = createAction(userIdChanged.type);
const changeResolved = createAction(resolvedChanged.type);
const changePriority = createAction(priorityChanged.type);
const changeModalValues = createAction(modalValuesChanged.type);
const resetModalValues = createAction(modalValuesReset.type);

export {
    changeDescription,
    changeUserId,
    changeResolved,
    changePriority,
    changeModalValues,
    resetModalValues
};
