const inventory = require('./data.json');
const rootReducer = require('./rootReducer.js');
const { add, remove } = require('./actions.js');

const keys = Object.keys(inventory.products);
const products = [];
for (let key of keys) {
    const nextProduct = inventory.products[key];
    nextProduct.id = key;
    products.push(nextProduct);
}
const INITIAL_STATE = { inventory: products, cart: { totalPrice: 0, totalItems: 0, items: [] } };

describe('default output', function () {
    it('is a function', function () {
        expect(typeof rootReducer).toBe('function');
    });

    it('returns the initial state by default', function () {
        expect(rootReducer(INITIAL_STATE, { type: "@@redux/INITt.6.t.0.3.r" })).toEqual(INITIAL_STATE);
    });
});

describe('ADD action', function () {
    it('adds an item to the cart', function () {
        const id = INITIAL_STATE.inventory[1].id;
        expect(rootReducer(INITIAL_STATE, add(id, 1))).toEqual({
            ...INITIAL_STATE,
            cart: {
                totalItems: 1,
                totalPrice: 100,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 1,
                        totalPrice: 100
                    }
                ]
            }
        });
    });

    it('adds multiples of an item to the cart', function () {
        const id = INITIAL_STATE.inventory[1].id;
        const CURRENT_STATE = {
            ...INITIAL_STATE,
            cart: {
                totalItems: 1,
                totalPrice: 100,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 1,
                        totalPrice: 100
                    }
                ]
            }
        };
        expect(rootReducer(CURRENT_STATE, add(id, 1))).toEqual({
            ...INITIAL_STATE,
            cart: {
                totalItems: 2,
                totalPrice: 200,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 2,
                        totalPrice: 200
                    }
                ]
            }
        });
    });

    it('adds additional quantities of an already existing item', function () {
        const id = INITIAL_STATE.inventory[1].id;
        expect(rootReducer(INITIAL_STATE, add(id, 3))).toEqual({
            ...INITIAL_STATE,
            cart: {
                totalItems: 3,
                totalPrice: 300,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 3,
                        totalPrice: 300
                    }
                ]
            }
        });
    });
});

describe('REMOVE action', function () {
    it('removes an item from the cart when the quantity to remove is equal to or greater than the existing quantity', function () {
        const id = INITIAL_STATE.inventory[1].id;
        const CURRENT_STATE = {
            ...INITIAL_STATE,
            cart: {
                totalItems: 1,
                totalPrice: 100,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 1,
                        totalPrice: 100
                    }
                ]
            }
        };
        expect(rootReducer(CURRENT_STATE, remove(id, 1))).toEqual(INITIAL_STATE);
        expect(rootReducer(CURRENT_STATE, remove(id, 3))).toEqual(INITIAL_STATE);
    });

    it('reduces the quantity in the cart when the quantity to remove is less than the existing quantity', function () {
        const id = INITIAL_STATE.inventory[1].id;
        const CURRENT_STATE = {
            ...INITIAL_STATE,
            cart: {
                totalItems: 3,
                totalPrice: 300,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 3,
                        totalPrice: 300
                    }
                ]
            }
        };
        expect(rootReducer(CURRENT_STATE, remove(id, 1))).toEqual({
            ...INITIAL_STATE,
            cart: {
                totalItems: 2,
                totalPrice: 200,
                items: [
                    {
                        ...INITIAL_STATE.inventory[1],
                        qty: 2,
                        totalPrice: 200
                    }
                ]
            }
        });
    });
});