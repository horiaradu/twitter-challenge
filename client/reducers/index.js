import {Map, List, fromJS} from 'immutable';
import {
  REQUEST_TWEETS,
  RECEIVED_TWEETS,
  SET_STATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
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
    .delete('password')
    .set('resetPassword', Map())
    .set('forgotPassword', Map());
}

function loginFailed(state, action) {
  return state.set('auth',
    Map({
      isAuthenticated: false,
      status: action.status,
      statusText: action.statusText
    })
    )
    .set('resetPassword', Map())
    .set('forgotPassword', Map());
}

function initialState() {
  return fromJS({
    tweets: {
      baseUrl: '/api/twitter/search',
      canFetch: true
    }
  });
}

function resetPasswordSuccess(state, action) {
  return state
    .set('forgotPassword', Map({
      emailStatus: action.statusText,
      ok: false
    }))
    .set('auth', Map())
    .set('resetPassword', Map());
}

function resetPasswordFailure(state, action) {
  return state
    .set('forgotPassword', Map({
      emailStatus: action.statusText,
      ok: false
    }))
    .set('auth', Map())
    .set('resetPassword', Map());
}


function changePasswordSuccess(state) {
  return state.set('resetPassword', Map({
      resetStatus: 'Your password has been reset',
      ok: true
    }))
    .set('auth', Map())
    .set('forgotPassword', Map());
}


function changePasswordFailure(state, action) {
  return state.set('resetPassword', Map({
      resetStatus: action.statusText,
      ok: false
    }))
    .set('auth', Map())
    .set('forgotPassword', Map());
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
      return state.mergeDeep(action.state);
    case LOGIN_REQUEST:
      return requestLogin(state, action);
    case LOGIN_SUCCESS:
      return loginSucceeded(state, action);
    case LOGIN_FAILURE:
      return loginFailed(state, action);
    case LOGOUT:
      return initialState();
    case RESET_PASSWORD_SUCCESS:
      return resetPasswordSuccess(state, action);
    case RESET_PASSWORD_FAILURE:
      return resetPasswordFailure(state, action);
    case CHANGE_PASSWORD_SUCCESS:
      return changePasswordSuccess(state);
    case CHANGE_PASSWORD_FAILURE:
      return changePasswordFailure(state, action);
  }
  return state;
};
