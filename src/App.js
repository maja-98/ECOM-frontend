import { Routes,Route } from 'react-router-dom';

import Home from './components/Home';
import LayOut from './components/LayOut';
import PersistLogin from './features/auth/PersistLogin';
import CartView from './features/cart/CartView';
import AddItem from './features/items/AddItem';
import OrderList from './features/orders/OrderList';
import UserList from './features/users/UserList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LayOut/>}>
          
          <Route element={<PersistLogin/>}>
            <Route index element={<Home/>}/>
            <Route path='add'>
              <Route index element={<AddItem/>}/>
            </Route>
            <Route path='cart' >
              <Route index element={<CartView/>}/>
            </Route>

            <Route path='orders'>
              <Route index element={<OrderList/>}/>
            </Route>
            <Route path='users'>
              <Route index element={<UserList/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
