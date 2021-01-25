import Product from './Product';
import './ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div className="ProductList">
            {products.map(product => <Product key={product.id} product={product} />)}
        </div>
    )
}

export default ProductList;