import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="Home">
            <h2 className="Home-header">Welcome to Shoply!</h2>
            <h4>All the products you need in the modern world!</h4>
            <div className="Home-link-container">
                <Link className="Home-link" to="/products">Products</Link>
                <Link className="Home-link" to="/cart">Cart</Link>
            </div>
        </div>
    )
}

export default Home;