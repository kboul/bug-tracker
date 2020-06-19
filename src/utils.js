import store from './store';

/**
 *
 * @param {string} textNode
 * @returns {DOM el}
 */

const createTh = textNode => {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(textNode));
    return th;
};

/**
 *
 * @param {string} bugKey
 * @param {any} bugValue
 * @returns {string}
 */

const tableCellTdValue = (bugKey, bugValue) => {
    switch (bugKey) {
        case 'userId':
            return formatUserIdValue(bugValue);
        case 'resolved':
            return formatResolvedValue(bugValue);
        case 'priority':
            return formatPriorityValue(bugValue);
        default:
            return bugValue;
    }
};

/**
 *
 * @param {string} bugProp
 * @returns {string}
 */

const tableCellThValue = bugProp =>
    bugProp === 'userId' ? 'assigned to' : bugProp;

/**
 *
 * @param {number | null} bugValue
 * @returns {string}
 */

const formatUserIdValue = bugValue => {
    const users = store.getState().entities.users.list;
    if (bugValue && users[bugValue - 1]) return users[bugValue - 1].name;
    return '-';
};

/**
 *
 * @param {bool} bugValue
 * @returns {string}
 */

const formatResolvedValue = value => {
    return value ? 'yes' : 'no';
};

/**
 *
 * @param {string} value
 * @returns {bool}
 */

const unFormatResolvedValue = value => {
    return value === 'no' ? false : true;
};
/**
 *
 * @param {number} codeNum
 * @returns {string}
 */

const formatPriorityValue = codeNum => {
    const low = 'low';
    switch (codeNum) {
        case 1:
            return low;
        case 2:
            return 'medium';
        case 3:
            return 'high';
        default:
            return low;
    }
};

export {
    createTh,
    tableCellTdValue,
    tableCellThValue,
    formatPriorityValue,
    unFormatResolvedValue
};
