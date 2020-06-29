import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, editBug, removeBug, loadBugs } from './actions';
import apiTypes from '../../store/api/actionTypes';
import bugTypes from './actionTypes';
import configureStore from '../configureStore';
import { unresolvedBugs, bugsByUser } from '../utils';

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

    const url = '/bugs';

    // solidarity test
    describe('addBug action creator', () => {
        it('should handle the addBug action', () => {
            const result = addBug(bug);
            const expected = {
                type: apiTypes.apiCallBegan,
                payload: {
                    url,
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

        describe('loadingBugs', () => {
            describe('if the bugs exist in the cache', () => {
                it('they should not be fetched from the server again', async () => {
                    fakeAxios.onGet(url).reply(200, [bug]);

                    // dispatch two times and see if
                    // we had a single http to the backend
                    await store.dispatch(loadBugs());
                    await store.dispatch(loadBugs());

                    expect(fakeAxios.history.get.length).toBe(1);
                });
            });

            describe('if the bugs don"t exist in the cache', () => {
                it('they should be fetched from the server and put in the store', async () => {
                    fakeAxios.onGet(url).reply(200, [bug]);

                    await store.dispatch(loadBugs());

                    expect(bugs().list).toHaveLength(1);
                });

                describe('loading indicator', () => {
                    it('should be true while fetching the bugs', () => {
                        fakeAxios.onGet(url).reply(() => {
                            expect(bugs().loading).toBeTruthy();
                            return [200, [bug]];
                        });

                        store.dispatch(loadBugs());
                    });

                    it('should be false after the bugs are fetched', async () => {
                        fakeAxios.onGet(url).reply(200, [bug]);

                        await store.dispatch(loadBugs());

                        expect(bugs().loading).toBeFalsy();
                    });

                    it('should be false if th eserver returns an error', async () => {
                        fakeAxios.onGet(url).reply(500);

                        await store.dispatch(loadBugs());

                        expect(bugs().loading).toBeFalsy();
                    });
                });
            });
        });

        describe('addBug', () => {
            it('should add a bug to the store if it is saved to the server', async () => {
                fakeAxios.onPost(url).reply(200, bug);

                await store.dispatch(addBug(bug));

                expect(bugs().list).toContainEqual(bug);
            });

            it('should not add a bug to the store if it is not saved to the server', async () => {
                fakeAxios.onPost(url).reply(500);

                await store.dispatch(addBug(bug));

                expect(bugs().list).toHaveLength(0);
            });
        });

        describe('editBug', () => {
            let editedBug;
            beforeEach(async () => {
                editedBug = { ...bug, resolved: true };

                fakeAxios.onPost(url).reply(200, bug);

                await store.dispatch(addBug(bug));
            });

            it('should edit a bug to the store if it is saved to the server', async () => {
                fakeAxios.onPut(`${url}/1`).reply(200, editedBug);

                await store.dispatch(editBug(editedBug));

                expect(bugs().list[0].resolved).toBeTruthy();
            });

            it('should not edit a bug to the store if it is not saved to the server', async () => {
                fakeAxios.onPut(`${url}/1`).reply(500);

                await store.dispatch(editBug(editedBug));

                expect(bugs().list[0].resolved).toBeFalsy();
            });
        });

        describe('removeBug', () => {
            it('should remove a bug to the store if it is saved to the server', async () => {
                fakeAxios.onPost(url).reply(200, bug);
                await store.dispatch(addBug(bug));

                fakeAxios.onDelete(`${url}/1`).reply(200, bug);

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
                { id: 2, resolved: false },
                { id: 3, resolved: false }
            ];

            const result = unresolvedBugs(state);
            expect(result).toHaveLength(2);
        });

        it('bugsByUser', () => {
            const state = createState();
            state.entities.bugs.list = [
                { id: 1, userId: 1 },
                { id: 2, userId: 1 },
                { id: 3, userId: 2 }
            ];

            const result = bugsByUser(2)(state);
            expect(result).toHaveLength(1);
        });
    });
});
