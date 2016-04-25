import 'babel-polyfill';

// Define an action type, it's used for reducer switching
export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const RECEIVED_TWEETS = 'RECEIVED_TWEETS';

// Define the corresponding action creator, must return an object
export function requestTweets(query) {
  return {
    type: REQUEST_TWEETS,
    query
  };
}

export function receiveTweets(query, tweets) {
  return {
    type: RECEIVED_TWEETS,
    query,
    tweets: tweets,
    receivedAt: Date.now()
  }
}

export function fetchTweets(query) {
  return function (dispatch) {
    dispatch(requestTweets(query));

    return fetch(`/api/twitter/search?query=${query}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveTweets(query, json.statuses))
      );
  }
}