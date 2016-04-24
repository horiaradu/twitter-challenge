import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import DashboardContainer from './containers/DashboardContainer'
import TweetsContainer from './containers/TweetsContainer'

const store = configureStore();

const routes = <Route component={App}>
  <Route path="tweets" component={TweetsContainer}/>
  <Route path="/" component={DashboardContainer}/>
</Route>;

render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);