import { Routes,Route } from 'react-router-dom';

import Home from './components/Home';
import LayOut from './components/LayOut';
import CartView from './features/cart/CartView';
import ItemList from './features/items/ItemList';
import OrderList from './features/orders/OrderList';
import UserList from './features/users/UserList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LayOut/>}>
          <Route index element={<Home/>}/>
          <Route path='cart' >
            <Route index element={<CartView/>}/>
          </Route>
          <Route path='items'>
            <Route index element={<ItemList/>}/>
          </Route>
          <Route path='orders'>
            <Route index element={<OrderList/>}/>
          </Route>
          <Route path='users'>
            <Route index element={<UserList/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
