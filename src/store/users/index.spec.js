import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import configureStore from '../configureStore';
import { loadUsers } from '.';

describe('users CRUD', () => {
    let fakeAxios;
    let store;
    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const user = { id: 1, name: 'John' };
    const url = '/users';

    const users = () => store.getState().entities.users;

    describe('loadingUsers', () => {
        describe('if the users exist in the cache', () => {
            it('they should not be fetched from the server again', async () => {
                fakeAxios.onGet(url).reply(200, [user]);

                // dispatch two times and see if
                // we had a single http to the backend
                await store.dispatch(loadUsers());
                await store.dispatch(loadUsers());

                expect(fakeAxios.history.get.length).toBe(1);
            });
        });

        it('they should be fetched from the server and put in the store', async () => {
            fakeAxios.onGet(url).reply(200, [user]);

            await store.dispatch(loadUsers());

            expect(users().list).toHaveLength(1);
        });

        describe('loading indicator', () => {
            it('should be true while fetching the bugs', () => {
                fakeAxios.onGet(url).reply(() => {
                    expect(users().loading).toBeTruthy();
                    return [200, [user]];
                });

                store.dispatch(loadUsers());
            });

            it('should be false after the bugs are fetched', async () => {
                fakeAxios.onGet(url).reply(200, [user]);

                await store.dispatch(loadUsers());

                expect(users().loading).toBeFalsy();
            });

            it('should be false if th eserver returns an error', async () => {
                fakeAxios.onGet(url).reply(500);

                await store.dispatch(loadUsers());

                expect(users().loading).toBeFalsy();
            });
        });
    });
});
