import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, editBug, removeBug } from './actions';
import apiTypes from '../../store/api/actionTypes';
import bugTypes from './actionTypes';
import configureStore from '../configureStore';
import { unresolvedBugs } from '../utils';

describe('bugs', () => {
    const bug = {
        id: 1,
        description: 'a',
        userId: 1,
        resolved: false,
        priority: 1
    };

    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    });

    // solidarity test
    describe('addBug action creator', () => {
        it('should handle the addBug action', () => {
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

    // social or integration test
    describe('bug CRUD', () => {
        let fakeAxios;
        let store;
        beforeEach(() => {
            fakeAxios = new MockAdapter(axios);
            store = configureStore();
        });

        const bugs = () => store.getState().entities.bugs;

        describe('addBug', () => {
            it('should add a bug to the store if it is saved to the server', async () => {
                fakeAxios.onPost('/bugs').reply(200, bug);

                await store.dispatch(addBug(bug));

                expect(bugs().list).toContainEqual(bug);
            });

            it('should not add a bug to the store if it is not saved to the server', async () => {
                fakeAxios.onPost('/bugs').reply(500);

                await store.dispatch(addBug(bug));

                expect(bugs().list).toHaveLength(0);
            });
        });

        describe('editBug', () => {
            let editedBug;
            beforeEach(async () => {
                editedBug = { ...bug, resolved: true };

                fakeAxios.onPost('/bugs').reply(200, bug);

                await store.dispatch(addBug(bug));
            });

            it('should edit a bug to the store if it is saved to the server', async () => {
                fakeAxios.onPut('/bugs/1').reply(200, editedBug);

                await store.dispatch(editBug(editedBug));

                expect(bugs().list[0].resolved).toBeTruthy();
            });

            it('should not edit a bug to the store if it is not saved to the server', async () => {
                fakeAxios.onPut('/bugs/1').reply(500, editedBug);

                await store.dispatch(editBug(editedBug));

                expect(bugs().list[0].resolved).toBeFalsy();
            });
        });

        describe('removeBug', () => {
            beforeEach(async () => {
                fakeAxios.onPost('/bugs').reply(200, bug);

                await store.dispatch(addBug(bug));
            });

            it('should remove a bug to the store if it is saved to the server', async () => {
                fakeAxios.onDelete('/bugs/1').reply(200, bug);

                await store.dispatch(removeBug(1));

                expect(bugs().list).toHaveLength(0);
            });
        });
    });

    describe('selectors', () => {
        it('unresolvedBugs', () => {
            const state = createState();
            state.entities.bugs.list = [
                { id: 1, resolved: true },
                { id: 1, resolved: false },
                { id: 1, resolved: false }
            ];

            const result = unresolvedBugs(state);
            expect(result).toHaveLength(2);
        });
    });
});
