import {Map, fromJS} from 'immutable';
import {REQUEST_TWEETS, RECEIVED_TWEETS} from '../actions'

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

export default function (state = Map(), action) {
  switch (action.type) {
    case REQUEST_TWEETS:
      return requestTweets(state, action);
    case RECEIVED_TWEETS:
      return receiveTweets(state, action);
  }
  return state;
};
