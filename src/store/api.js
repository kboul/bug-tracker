import { createAction } from '@reduxjs/toolkit';

const prefix = 'api';

const apiCallBegan = createAction(`${prefix}/callBegan`);
const apiCallSuccess = createAction(`${prefix}/callSuccess`);
const apiCallFailed = createAction(`${prefix}/callFailed`);

export { apiCallBegan, apiCallSuccess, apiCallFailed };
