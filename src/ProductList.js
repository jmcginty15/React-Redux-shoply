import PartialProduct from './PartialProduct';
import DiscountForm from './DiscountForm';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, totalItems, totalPrice, tax, discount, grandTotal }) => {
    return (
        <div className="ProductList">
            {totalItems ? <h1>Cart</h1> : null}
            {products.length ? null : (
                <div>
                    <h1>Nothing in the cart!</h1>
                    <Link className="ProductList-back" to="/products">Back to list</Link>
                </div>
            )}
            {products.map(product => <PartialProduct key={product.id} product={product} />)}
            {totalItems ? <DiscountForm /> : null}
            {totalItems ? (
                <div className="ProductList-totals">
                    <h2>Total items: {totalItems}</h2>
                    <div className="ProductList-price-container">
                        <h2 className="ProductList-price-label">Order price:</h2>
                        <h2 className="ProductList-price">${totalPrice.toFixed(2)}</h2>
                        {discount.percentage ? <h2 className="ProductList-price-label">{discount.percentage * 100}% discount:</h2> : null}
                        {discount.percentage ? <h2 className="ProductList-price">- <span className="ProductList-discount">${discount.amount.toFixed(2)}</span></h2> : null}
                        <h2 className="ProductList-price-label">7.25% tax:</h2>
                        <h2 className="ProductList-price">+ <span className="ProductList-tax">${tax.toFixed(2)}</span></h2>
                    </div>
                    <hr className="ProductList-line" />
                    <div className="ProductList-price-container">
                        <h2 className="ProductList-price-label">Total:</h2>
                        <h2 className="ProductList-price">${grandTotal.toFixed(2)}</h2>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ProductList;