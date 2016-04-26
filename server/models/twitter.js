module.exports = function (Twitter) {
  'use strict';
  const uri = require('urijs');

  Twitter.search = function (query, count, maxId) {
    const client = new require('twitter')({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: '',
      access_token_secret: ''
    });

    let queryParams = {q: query};
    if (count) queryParams = Object.assign(queryParams, {count});
    if (maxId) queryParams = Object.assign(queryParams, {max_id: maxId});

    return new Promise((resolve, reject) => {
      client.get('search/tweets.json',
        queryParams,
        (error, tweets, response) => error ? reject(error) : resolve(formatResponse(tweets))
      );
    });

    function formatResponse(searchAPIResponse) {
      let response = {
        statuses: searchAPIResponse.statuses,
        search_metadata: Object.assign({}, searchAPIResponse.search_metadata)
      };

      delete response.search_metadata.refresh_url;
      delete response.search_metadata.next_results;

      const nextMaxId = uri.parseQuery(searchAPIResponse.search_metadata.next_results).max_id;
      console.log(nextMaxId);
      if (nextMaxId) {
        response.search_metadata.next_results = uri('')
          .query({
            query,
            count,
            maxId: nextMaxId
          })
          .toString();
      }

      return response;
    }
  };

  Twitter.remoteMethod(
    'search',
    {
      description: 'Search tweets',
      accepts: [
        {arg: 'query', type: 'string', http: {source: 'query'}, required: true},
        {arg: 'count', type: 'number', http: {source: 'query'}, required: false},
        {arg: 'maxId', type: 'string', http: {source: 'query'}, required: false}
      ],
      returns: {type: 'object', root: true},
      http: {verb: 'get'}
    }
  );
};
