import { useState } from 'react';
import './App.css';
import CartView from './features/cart/CartView';
import ItemList from './features/items/ItemList';
import OrderList from './features/orders/OrderList';
import UserList from './features/users/UserList';
import Test from './Test';

function App() {
  const [show,setShow] = useState(true)
  return (
    <div className="App">
      {show && <Test/>}
      <button onClick={() => setShow(prev => !prev)} >Mount Toggle</button>
      <ItemList/>
      <UserList/>
      <CartView/>
      <OrderList/>

    </div>
  );
}

export default App;
