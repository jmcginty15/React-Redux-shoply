const inventory = require('./data.json');

const keys = Object.keys(inventory.products);
const products = [];
for (let key of keys) {
    const nextProduct = inventory.products[key];
    nextProduct.id = key;
    products.push(nextProduct);
}
const storageCart = localStorage.getItem('cart');
const initialCart = storageCart ? JSON.parse(storageCart) : {
    totalPrice: 0,
    totalItems: 0,
    tax: 0,
    discount: {
        percentage: 0,
        amount: 0
    },
    grandTotal: 0,
    items: []
}
const INITIAL_STATE = {
    inventory: products,
    cart: initialCart
};

const rootReducer = (state = INITIAL_STATE, action) => {
    const inventory = [...state.inventory];
    const cart = [...state.cart.items];
    const inventoryItem = action.payload ? findItem(inventory, action.payload.id) : null;
    let cartItem = action.payload ? findItem(cart, action.payload.id) : null;
    let cartPrice = 0;
    let cartItems = 0;
    let tax = 0;
    let discount = { ...state.cart.discount };

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
            tax = cartPrice * 0.0725;
            tax = +tax.toFixed(2);
            discount.amount = cartPrice * discount.percentage;
            const addCart = {
                totalPrice: cartPrice,
                totalItems: cartItems,
                tax: tax,
                discount: discount,
                grandTotal: cartPrice - discount.amount + tax,
                items: cart
            }
            localStorage.setItem('cart', JSON.stringify(addCart));
            return {
                inventory: inventory,
                cart: addCart
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
                tax = cartPrice * 0.0725;
                tax = +tax.toFixed(2);
                discount.amount = cartPrice * discount.percentage;
                const removeCart = {
                    totalPrice: cartPrice,
                    totalItems: cartItems,
                    tax: tax,
                    discount: discount,
                    grandTotal: cartPrice - discount.amount + tax,
                    items: cart
                }
                localStorage.setItem('cart', JSON.stringify(removeCart));
                return {
                    inventory: inventory,
                    cart: removeCart
                };
            }
            return { ...state };
        case 'APPLY_DISCOUNT':
            discount.percentage = action.payload.discountPercent;
            discount.amount = state.cart.totalPrice * discount.percentage;
            const newCart = {
                ...state.cart,
                discount: discount,
                grandTotal: state.cart.totalPrice - discount.amount + state.cart.tax
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart
            }
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