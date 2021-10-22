import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/userListScreen';
import UserUpdateScreen from './screens/UserUpdateScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductUpdateScreen from './screens/ProductUpdateScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import UserAdsScreen from './screens/UserAdsScreen';
import ProductsByCategoryScreen from './screens/ProductsByCategoryScreen';
import AdsListScreen from './screens/AdsListScreen';
import AdsHotScreen from './screens/AdsHotScreen';
import AdsPopularScreen from './screens/AdsPopularScreen';
import AdsRecentScreen from './screens/AdsRecentScreen';

// import ChatScreen from './screens/ChatScreen';
import history from '../history';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import SocketContext from '../context/SocketContext';
// import io from 'socket.io-client';

// const socket = io.connect(`https://comercio-moz.herokuapp.com`, {
//   reconnection: true,
//   reconnectionDelay: 500,
//   reconnectionAttempts: 10,
// });

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        {/* <SocketContext.Provider
        value={socket}
        > */}
        <Header />
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:slug/:id' component={ProductScreen} />
          <Route
            path='/ads/categoria/:name'
            component={ProductsByCategoryScreen}
          />
          <Route path='/ads/pesquisa' component={AdsListScreen} />
          <Route path='/ads/quente' component={AdsHotScreen} />
          <Route path='/ads/popular' component={AdsPopularScreen} />
          <Route path='/ads/recente' component={AdsRecentScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/userAds' component={UserAdsScreen} />
          <Route path='/admin/users/update/:id' component={UserUpdateScreen} />
          <Route
            path='/admin/products/update/:id'
            component={ProductUpdateScreen}
          />
          <Route path='/admin/products/new/' component={ProductCreateScreen} />
          <Route
            path='/admin/products/:isUpdated?'
            component={ProductListScreen}
          />
          <Route path='/admin/users' component={UserListScreen} />
          <Route path='/admin/orders' component={OrderListScreen} />

          {/* <Route path="/admin/chat/:userId?" component={ChatScreen} /> */}
        </Switch>
        {/* </SocketContext.Provider> */}
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          autoClose={3600000}
        />
        <Footer />
      </Router>
    </React.Fragment>
  );
};

export default App;
