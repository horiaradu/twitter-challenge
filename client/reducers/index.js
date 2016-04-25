import {Map, fromJS} from 'immutable';
import {REQUEST_TWEETS, RECEIVED_TWEETS, SET_STATE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions'

function requestTweets(state, action) {
  return state.set('tweets',
    Map({
      query: action.query,
      isFetching: true
    })
  );
}

function receiveTweets(state, action) {
  return state.set('tweets',
    Map({
      query: action.query,
      isFetching: false,
      items: fromJS(action.tweets),
      lastUpdated: action.receivedAt
    })
  );
}

function requestLogin(state, action) {
  return state.set('auth',
    Map({
      isAuthenticating: true
    })
  );
}

function loginSucceeded(state, action) {
  return state.set('auth',
    Map({
      isAuthenticated: true,
      token: action.token,
      email: action.email
    })
  );
}

function loginFailed(state, action) {
  return state.set('auth',
    Map({
      isAuthenticated: false,
      statusTest: action.statusText
    })
  );
}

export default function (state = Map(), action) {
  switch (action.type) {
    case REQUEST_TWEETS:
      return requestTweets(state, action);
    case RECEIVED_TWEETS:
      return receiveTweets(state, action);
    case SET_STATE:
      return state.merge(action.state);
    case LOGIN_REQUEST:
      return requestLogin(state, action);
    case LOGIN_SUCCESS:
      return loginSucceeded(state, action);
    case LOGIN_FAILURE:
      return loginFailed(state, action);
  }
  return state;
};
