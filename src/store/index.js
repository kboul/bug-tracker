import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';

const composerEnhancer = composeWithDevTools({
    trace: true
});

const middleWares = [logger('console'), toast]; // Put the list of third part plugins in an array

const store = createStore(
    reducer,
    compose(composerEnhancer(), applyMiddleware(...middleWares))
);

export default store;
