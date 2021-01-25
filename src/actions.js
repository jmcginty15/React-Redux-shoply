import { ADD, REMOVE } from './actionTypes';

export const add = (id, qty) => {
    return {
        type: ADD,
        payload: {
            id: id,
            qty: qty
        }
    };
}

export const remove = (id, qty) => {
    return {
        type: REMOVE,
        payload: {
            id: id,
            qty: qty
        }
    };
}