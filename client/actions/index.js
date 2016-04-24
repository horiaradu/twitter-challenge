// Define an action type, it's used for reducer switching
export const FETCH_TWEETS = 'FETCH_TWEETS';

// Define the corresponding action creator, must return an object
export function fetchTweets() {
	return {
		type: FETCH_TWEETS
	};
}
