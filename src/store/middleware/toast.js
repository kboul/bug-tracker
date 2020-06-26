/**
 *
 * @param {Object} store
 * @param {Function} next - reference to the next function in our middleware pipeline
 * @param {Object} action - action we dispatched
 * @returns {void}
 */

const toast = store => next => action => {
    if (action.type === 'error')
        console.log('Toastify: ', action.payload.message);
    else return next(action); // needs to be returned to be retrieved during tests
};

export default toast;
