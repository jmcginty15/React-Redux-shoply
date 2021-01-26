import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from './actions';
import { Link, useParams } from 'react-router-dom';
import { findItem } from './rootReducer';
import './FullProduct.css';

const FullProduct = () => {
    const products = useSelector(state => state.inventory);
    const cart = useSelector(state => state.cart);
    const { id } = useParams();
    const product = findItem(products, id);
    const cartProduct = findItem(cart.items, id);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const handleChange = (evt) => setQty(+evt.target.value);
    const handleAdd = () => dispatch(add(product.id, qty));
    const handleRemove = () => dispatch(remove(product.id, qty));

    return (
        <div className="FullProduct">
            <img className="FullProduct-image" src={product.image_url} alt={product.name} />
            <div className="FullProduct-info">
                <h3 className="FullProduct-header">{product.name}</h3>
                <p>${product.price}</p>
                <p className="FullProduct-description">{product.description}</p>
                <form className="FullProduct-form">
                    <label htmlFor="quantity">Quantity:</label>
                    <input className="FullProduct-quantity" type="number" name="quantity" min="1" value={qty} onChange={handleChange} />
                    <div className="FullProduct-button-container">
                        <button className="FullProduct-button FullProduct-button-add" type="button" onClick={handleAdd}>Add to cart</button>
                        <button className="FullProduct-button FullProduct-button-remove" type="button" onClick={handleRemove}>Remove from cart</button>
                    </div>
                </form>
                <p className="FullProduct-cart">Currently in cart: {cartProduct ? cartProduct.qty : 0}</p>
                <div className="FullProduct-link-container">
                    <Link className="FullProduct-back" to="/products">Back to list</Link>
                    <Link className="FullProduct-back" to="/cart">Back to cart</Link>
                </div>
            </div>
        </div>
    )
}

export default FullProduct;