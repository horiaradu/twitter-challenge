import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';
import configureStore from './store/configure_store';
import App from './containers/App';
import DashboardContainer from './containers/DashboardContainer'
import TweetsContainer from './containers/TweetsAppContainer'
import LoginContainer from './containers/LoginContainer'
import ForgotPasswordContainer from './containers/ForgotPasswordContainer'
import ResetPasswordContainer from './containers/ResetPasswordContainer'
import {requireAuthentication} from './containers/AuthenticatedContainer'
import {loginSuccess} from './actions'

require('./styles/App.less');
require('font-awesome/css/font-awesome.css');

const store = configureStore();
const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
if (token) {
  store.dispatch(loginSuccess(email, token))
}

const routes = <Route component={App}>
  <Route path="login" component={LoginContainer}/>
  <Route path="forgot-password" component={ForgotPasswordContainer}/>
  <Route path="reset-password" component={ResetPasswordContainer}/>
  <Route path="tweets" component={requireAuthentication(TweetsContainer)}/>
  <Route path="/" component={requireAuthentication(DashboardContainer)}/>
</Route>;

render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);