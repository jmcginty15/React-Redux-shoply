import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from './actions';
import { Link } from 'react-router-dom';
import { findItem } from './rootReducer';
import './PartialProduct.css';

const PartialProduct = ({ product }) => {
    const cart = useSelector(state => state.cart);
    const cartItem = findItem(cart.items, product.id);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const handleChange = (evt) => setQty(+evt.target.value);
    const handleAdd = () => dispatch(add(product.id, qty));
    const handleRemove = () => dispatch(remove(product.id, qty));

    return (
        <div className="PartialProduct">
            <h2 className="PartialProduct-header">{product.name}</h2>
            <h2 className="PartialProduct-header">${product.price}</h2>
            <form className="PartialProduct-form">
                <label htmlFor="quantity">Quantity:</label>
                <input className="PartialProduct-quantity" type="number" name="quantity" min="1" value={qty} onChange={handleChange} />
                <div className="PartialProduct-button-container">
                    <button className="PartialProduct-button PartialProduct-button-add" type="button" onClick={handleAdd}>Add to cart</button>
                    <button className="PartialProduct-button PartialProduct-button-remove" type="button" onClick={handleRemove}>Remove from cart</button>
                </div>
            </form>
            <div className="PartialProduct-link-container">
                <p className="PartialProduct-cart">Currently in cart: {cartItem ? cartItem.qty : 0}</p>
                <Link className="PartialProduct-link" to={`/products/${product.id}`}>Item details</Link>
            </div>
        </div>
    )
}

export default PartialProduct;