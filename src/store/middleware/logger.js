/**
 *
 * @param {string} param
 * @param {Object} store
 * @param {Function} next - reference to the next function in our middleware pipeline
 * @param {Object} action - action we dispatched
 * @returns {void}
 */

const logger = param => store => next => action => {
    // console.log('Logging', param);
    next(action);
};

export default logger;
