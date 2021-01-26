import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
    const cart = useSelector(state => state.cart);

    return (
        <ul className="NavBar">
            <li className="NavLink-left"><NavLink to="/">Shoply</NavLink></li>
            <li className="NavLink-right">
                <NavLink to="/cart">
                    <i className="fa fa-shopping-cart"></i> | {cart.totalItems} Item{cart.totalItems === 1 ? null : 's'} | ${cart.grandTotal.toFixed(2)}
                </NavLink>
            </li>
            <li className="NavLink-right"><NavLink to="/products">Products</NavLink></li>
        </ul>
    )
}

export default NavBar;