const { ADD, REMOVE, APPLY_DISCOUNT } = require('./actionTypes.js');

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

const applyDiscount = (code) => {
    switch (code) {
        case 'REMOVE10':
            return {
                type: APPLY_DISCOUNT,
                payload: {
                    discountPercent: 0.1
                }
            }
        case 'REMOVE20':
            return {
                type: APPLY_DISCOUNT,
                payload: {
                    discountPercent: 0.2
                }
            }
        case 'REMOVE30':
            return {
                type: APPLY_DISCOUNT,
                payload: {
                    discountPercent: 0.3
                }
            }
        default:
            return null;
    }
}

const removeDiscount = () => {
    return {
        type: APPLY_DISCOUNT,
        payload: {
            discountPercent: 0
        }
    }
}

module.exports = { add, remove, applyDiscount, removeDiscount };