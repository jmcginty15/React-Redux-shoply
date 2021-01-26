const { ADD, REMOVE } = require('./actionTypes.js');

const add = (id, qty) => {
    return {
        type: ADD,
        payload: {
            id: id,
            qty: qty
        }
    };
}

const remove = (id, qty) => {
    return {
        type: REMOVE,
        payload: {
            id: id,
            qty: qty
        }
    };
}

module.exports = { add, remove };