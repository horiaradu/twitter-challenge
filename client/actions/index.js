import 'babel-polyfill';
import {checkHttpStatus} from '../utils';
import {hashHistory} from 'react-router';
import uri from 'urijs';

// Define an action type, it's used for reducer switching
export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const RECEIVED_TWEETS = 'RECEIVED_TWEETS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_STATE = 'SET_STATE';
export const LOGOUT = 'LOGOUT';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

// Define the corresponding action creator, must return an object
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export function requestTweets(query) {
  return {
    type: REQUEST_TWEETS,
    query
  };
}

export function receiveTweets(query, tweets, nextResults) {
  return {
    type: RECEIVED_TWEETS,
    query,
    tweets: tweets,
    nextResults
  }
}

export function fetchTweets(query) {
  return function (dispatch, getState) {
    dispatch(requestTweets(query));

    return fetch(nextUrl(getState()))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTweets(query, json.statuses, json.search_metadata.next_results));
      })
      .catch(error => dispatch(logout()));
  };

  function nextUrl(state) {
    const nextQuery = uri.parseQuery(state.getIn(['tweets', 'nextResults']));
    console.log(nextQuery);
    const baseUrl = state.getIn(['tweets', 'baseUrl']);

    return uri(baseUrl)
      .query(Object.assign({query, count: 20}, nextQuery, {access_token: state.getIn(['auth', 'token'])}))
      .toString();
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(email, token) {
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  return {
    type: LOGIN_SUCCESS,
    email,
    token
  };
}

export function loginFailure(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  return {
    type: LOGIN_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  }
}

export function login(email, password, redirect = '/') {
  return function (dispatch) {
    dispatch(loginRequest());
    return fetch('/api/users/login/', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        const token = response.id;
        if (token) {
          dispatch(loginSuccess(email, token));
          hashHistory.push(redirect);
        } else {
          dispatch(loginFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      })
      .catch(error => dispatch(loginFailure(error)));
  }
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT
  };
}

export function forgotPassword(email) {
  return function (dispatch) {
    return fetch(`/api/users/reset-password-request?email=${email}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(() => dispatch(resetPasswordSuccess()))
      .catch(error => dispatch(resetPasswordFailure(error)));
  }
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS
  };
}

export function resetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    statusText: error.response.statusText
  };
}

export function resetPassword(password, accessToken, redirect = '/login') {
  return function (dispatch, getState) {
    return fetch(`/api/users/reset-password?access_token=${accessToken}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({confirmation: password, password: password})
    })
      .then(checkHttpStatus)
      .then(() => {
        dispatch(changePasswordSuccess());
        hashHistory.push(redirect);
      })
      .catch(error => dispatch(changePasswordFailure(error)));
  }
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  };
}

export function changePasswordFailure(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    statusText: error.response.statusText
  };
}