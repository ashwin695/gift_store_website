import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Administrator/Dashboard/Dashboard';
import AdminLogin from './Components/Administrator/Dashboard/AdminLogin';
import Home from './Components/UserInterface/Pages/Home/Home';
import ProductList from './Components/UserInterface/Pages/ProductList/ProductList';
import ProductView from './Components/UserInterface/Pages/ProductView/ProductView';
import Cart from './Components/UserInterface/Pages/Cart/Cart';
import SignIn from './Components/UserInterface/Pages/SignIn/SignIn';
import Login from './Components/UserInterface/Pages/SignIn/Login';
import Register from './Components/UserInterface/Pages/SignIn/Register';
import Checkout from './Components/UserInterface/Pages/Checkout/Checkout';
import RazorpayPaymentGateway from './Components/UserInterface/Pages/Payment/RazorpayPaymentGateway';
import OrderSuccess from './Components/UserInterface/Pages/OrderSuccess/OrderSuccess';
import MyAccounts from './Components/UserInterface/Pages/MyAccounts/MyAccounts';
import MyAccountLogin from './Components/UserInterface/Pages/SignIn/MyAccount/MyAccountLogin';
import MyAccountRegister from './Components/UserInterface/Pages/SignIn/MyAccount/MyAccountRegister';
import ProductListByCategory from './Components/UserInterface/Pages/ProductList/ProductListByCategory';
import MoreCollection from './Components/UserInterface/Pages/MoreCollection/MoreCollection';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={ <Dashboard /> } path="/dashboard"></Route>
          <Route element={ <AdminLogin /> } path="/admin"></Route>
          <Route element={ <Home /> } path="/"></Route>
          <Route element={ <MoreCollection /> } path="/morecollection"></Route>
          <Route element={ <ProductListByCategory /> } path="/category_products/:id/:name"></Route>
          <Route element={ <ProductList /> } path="/products/:id/:name"></Route>
          <Route element={ <ProductView /> } path="/products/:id/:name/productview/:id/:name"></Route>
          <Route element={ <Cart /> } path="/cart"></Route>
          <Route element={ <SignIn /> } path="/signin"></Route>
          <Route element={ <Login /> } path="/login"></Route>
          <Route element={ <Register /> } path="/register"></Route>
          <Route element={ <Checkout /> } path="/checkout"></Route>
          <Route element={ <RazorpayPaymentGateway /> } path="/rzppayment"></Route>
          <Route element={ <OrderSuccess /> } path="/orderplacedsuccessfull/:invoiceno"></Route>
          <Route element={ <MyAccounts /> } path="/myaccounts/*"></Route>
          <Route element={ <MyAccountLogin /> } path="/accounts/login"></Route>
          <Route element={ <MyAccountRegister /> } path="/accounts/register"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
