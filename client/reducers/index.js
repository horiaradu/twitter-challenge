import {Map, List, fromJS} from 'immutable';
import {
  REQUEST_TWEETS,
  RECEIVED_TWEETS,
  SET_STATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions'

function requestTweets(state, action) {
  return state.merge(Map({
    query: action.query,
    isFetching: true
  }));
}

function receiveTweets(state, action) {
  const next = state
    .merge(Map({
      query: action.query,
      isFetching: false,
      nextResults: action.nextResults
    }))
    .update('items', List(),
      items => items.concat(fromJS(action.tweets))
    );

  if (action.nextResults) {
    return next.merge(Map({nextResults: action.nextResults}));
  } else {
    return next.merge(Map({canFetch: false}));
  }
}

function requestLogin(state, action) {
  return state.set('auth',
    Map({
      isAuthenticating: true
    })
  );
}

function loginSucceeded(state, action) {
  return state
    .set('auth',
      Map({
        isAuthenticated: true,
        token: action.token,
        email: action.email
      })
    )
    .delete('email')
    .delete('password');
}

function loginFailed(state, action) {
  return state.set('auth',
    Map({
      isAuthenticated: false,
      status: action.status,
      statusText: action.statusText
    })
  );
}

function initialState() {
  return fromJS({
    tweets: {
      baseUrl: '/api/twitter/search',
      canFetch: true
    }
  });
}

export default function (state = initialState(), action) {
  switch (action.type) {
    case REQUEST_TWEETS:
      return state.update('tweets', Map(),
        queryState => requestTweets(queryState, action));
    case RECEIVED_TWEETS:
      return state.update('tweets', Map(),
        queryState => receiveTweets(queryState, action));
    case SET_STATE:
      return state.merge(action.state);
    case LOGIN_REQUEST:
      return requestLogin(state, action);
    case LOGIN_SUCCESS:
      return loginSucceeded(state, action);
    case LOGIN_FAILURE:
      return loginFailed(state, action);
    case LOGOUT:
      return initialState();
  }
  return state;
};
