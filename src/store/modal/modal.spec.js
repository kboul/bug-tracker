import types from './actionTypes';
import {
    changeDescription,
    changeUserId,
    changePriority,
    changeResolved,
    changeModalValues,
    resetModalValues
} from './actions';
import configureStore from '../configureStore';

describe('modal', () => {
    const bug = {
        id: 1,
        description: '',
        userId: 1,
        resolved: false,
        priority: 1
    };

    const selectedBug = {
        id: 1,
        description: 'new description',
        userId: 2,
        resolved: true,
        priority: 2
    };

    let store;
    beforeEach(() => {
        store = configureStore();
    });

    const modal = () => store.getState().entities.modal;

    describe('changeDescription', () => {
        it('should handle the changeDescription action & update the store', () => {
            const payload = { description: 'a' };
            const result = changeDescription(payload);
            const expected = {
                type: types.descriptionChanged,
                payload
            };

            expect(result).toEqual(expected);

            store.dispatch(result);

            expect(modal().description).toEqual(payload.description);
        });
    });

    describe('changeUserId', () => {
        it('should handle the changeUserId action & update the store', () => {
            const payload = { userId: 2 };
            const result = changeUserId(payload);
            const expected = {
                type: types.userIdChanged,
                payload
            };

            expect(result).toEqual(expected);

            store.dispatch(result);

            expect(modal().userId).toEqual(payload.userId);
        });
    });

    describe('changeResolved', () => {
        it('should handle the changeResolved action & update the store', () => {
            const payload = { resolved: 'true' };
            const result = changeResolved(payload);
            const expected = {
                type: types.resolvedChanged,
                payload
            };

            expect(result).toEqual(expected);

            store.dispatch(result);

            expect(modal().resolved).toBeTruthy();
        });
    });

    describe('changePriority', () => {
        it('should handle the changePriority action & update the store', () => {
            const payload = { priority: 2 };
            const result = changePriority(payload);
            const expected = {
                type: types.priorityChanged,
                payload
            };

            expect(result).toEqual(expected);

            store.dispatch(result);

            expect(modal().priority).toEqual(payload.priority);
        });
    });

    describe('changeModalValues', () => {
        it('should change all modal values & update the store', () => {
            store.dispatch(changeModalValues(selectedBug));
            Object.keys(bug).forEach(key => {
                if (key !== 'id') expect(modal()[key]).not.toEqual(bug[key]);
            });
        });
    });

    describe('resetModalValues', () => {
        it('should reset all modal values to their intial state & update the store', () => {
            store.dispatch(changeModalValues(selectedBug));

            store.dispatch(resetModalValues());

            Object.keys(bug).forEach(key => {
                if (key !== 'id') expect(modal()[key]).toEqual(bug[key]);
            });
        });
    });
});
