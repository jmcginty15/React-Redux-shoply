import ProductList from './ProductList';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const products = useSelector(store => store.inventory);

  return (
    <div className="App">
      <ProductList products={products} />
    </div>
  );
}

export default App;
