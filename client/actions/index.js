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
    const nextQuery = state.getIn(['tweets', 'nextResults']);
    const baseUrl = state.getIn(['tweets', 'baseUrl']);
    return nextQuery ?
      `${baseUrl}${nextQuery}` :
      uri(baseUrl).query({query, count: 20}).toString()
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_SUCCESS,
    token
  };
}

export function loginFailure(error) {
  localStorage.removeItem('token');
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
          dispatch(loginSuccess(token));
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