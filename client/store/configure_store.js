import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger'
import reducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import {fetchTweets} from '../actions';

export default function configureStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger()
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}