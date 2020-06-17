import { addBug } from './actions';
import apiTypes from '../../store/api/actionTypes';
import bugTypes from './actionTypes';

describe('bugsSlice', () => {
    describe('action creators', () => {
        it('addBug', () => {
            const bug = { description: 'a' };
            const result = addBug(bug);
            const expected = {
                type: apiTypes.apiCallBegan,
                payload: {
                    url: '/bugs',
                    method: 'post',
                    data: bug,
                    onSuccess: bugTypes.bugAdded
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
