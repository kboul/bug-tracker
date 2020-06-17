import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';

const composerEnhancer = composeWithDevTools({
    trace: true
});

// Put the list of third part plugins in an array
const middleWares = [logger('console'), toast, api];

const store = createStore(
    reducer,
    // middlewares should go after reducer
    compose(applyMiddleware(...middleWares), composerEnhancer())
);

export default store;
