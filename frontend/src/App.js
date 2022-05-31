import './App.css';
import Header from './component/layout/header/Header.js';
import Footer from './component/layout/footer/Footer';
import Home from '../src/component/home/Home.js';
import ProductDetails from './component/product/ProductDetails.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './component/product/Products.js';
import Search from './component/product/Search.js';
import LoginSignup from './component/User/LoginSignup';
import React from 'react';
import store from './Store';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/header/UserOptions.js';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import Dashboard from './component/admin/Dashboard.js';
import NewProduct from './component/admin/NewProduct.js';
import ProductList from './component/admin/ProductList.js';
import UpdateProduct from './component/admin/UpdateProduct.js';
import About from './component/home/About.js';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product" element={<NewProduct />} />
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
