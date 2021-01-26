const inventory = require('./data.json');

const keys = Object.keys(inventory.products);
const products = [];
for (let key of keys) {
    const nextProduct = inventory.products[key];
    nextProduct.id = key;
    products.push(nextProduct);
}
const INITIAL_STATE = { inventory: products, cart: { totalPrice: 0, totalItems: 0, items: [] } };

const rootReducer = (state = INITIAL_STATE, action) => {
    const inventory = [...state.inventory];
    const cart = [...state.cart.items];
    const inventoryItem = action.payload ? findItem(inventory, action.payload.id) : null;
    let cartItem = action.payload ? findItem(cart, action.payload.id) : null;
    let cartPrice = 0;
    let cartItems = 0;

    switch (action.type) {
        case 'ADD':
            if (!cartItem) {
                inventoryItem.qty = 0;
                inventoryItem.totalPrice = 0;
                cart.push(inventoryItem);
                cartItem = findItem(cart, action.payload.id);
            }
            cartItem.qty += action.payload.qty;
            cartItem.totalPrice = cartItem.price * cartItem.qty;
            for (let item of cart) {
                cartPrice += item.totalPrice;
                cartItems += item.qty;
            }
            return {
                inventory: inventory,
                cart: {
                    totalPrice: cartPrice,
                    totalItems: cartItems,
                    items: cart
                }
            };
        case 'REMOVE':
            if (cartItem) {
                if (action.payload.qty >= cartItem.qty) {
                    const idx = findIndex(cart, cartItem.id);
                    cart.splice(idx, 1);
                } else {
                    cartItem.qty -= action.payload.qty;
                    cartItem.totalPrice = cartItem.price * cartItem.qty;
                }
                for (let item of cart) {
                    cartPrice += item.totalPrice;
                    cartItems += item.qty;
                }
                return {
                    inventory: inventory,
                    cart: {
                        totalPrice: cartPrice,
                        totalItems: cartItems,
                        items: cart
                    }
                };
            }
            return { ...state };
        default:
            return { ...state };
    }
}

const findItem = (inventory, id) => {
    for (let item of inventory) if (item.id === id) return item;
    return null;
}

const findIndex = (inventory, id) => {
    let i = 0;
    for (let item of inventory) {
        if (item.id === id) return i;
        else i += 1;
    }
    return null;
}

module.exports = { rootReducer, findItem };