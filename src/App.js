import ProductList from './ProductList';
import FullProduct from './FullProduct';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  const products = useSelector(state => state.inventory);
  const cart = useSelector(state => state.cart);

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Route exact path="/">
            Butt
          </Route>
          <Route exact path="/products">
            <ProductList products={products} />
          </Route>
          <Route exact path="/products/:id">
            <FullProduct />
          </Route>
          <Route exact path="/cart">
            <ProductList products={cart.items} totalItems={cart.totalItems} totalPrice={cart.totalPrice} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
