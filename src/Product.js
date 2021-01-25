import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add, remove } from './actions';
import './Product.css';

const Product = ({ product }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const handleChange = (evt) => setQty(+evt.target.value);
    const handleAdd = () => dispatch(add(product.id, qty));
    const handleRemove = () => dispatch(remove(product.id, qty));

    return (
        <div className="Product">
            <img className="Product-image" src={product.image_url} alt={product.name} />
            <div className="Product-info">
                <h3 className="Product-header">{product.name}</h3>
                <p>${product.price}</p>
                <p className="Product-description">{product.description}</p>
                <form className="Product-form">
                    <label htmlFor="quantity">Quantity:</label>
                    <input className="Product-quantity" type="number" name="quantity" min="1" value={qty} onChange={handleChange} />
                    <div className="Product-button-container">
                        <button className="Product-button Product-button-add" type="button" onClick={handleAdd}>Add to cart</button>
                        <button className="Product-button Product-button-remove" type="button" onClick={handleRemove}>Remove from cart</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product;