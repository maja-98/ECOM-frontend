import './App.css';
import CartView from './features/cart/CartView';
import ItemList from './features/items/ItemList';
import UserList from './features/users/UserList';

function App() {

  return (
    <div className="App">
      <ItemList/>
      <UserList/>
      <CartView/>
    </div>
  );
}

export default App;
