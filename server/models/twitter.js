module.exports = function (Twitter) {
  Twitter.search = function (query) {
    const client = new require('twitter')({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: '',
      access_token_secret: ''
    });

    return new Promise((resolve, reject) => {
      client.get('search/tweets.json',
        {q: query},
        (error, tweets, response) => error ? reject(error) : resolve(tweets)
      );
    });
  };

  Twitter.remoteMethod(
    'search',
    {
      description: 'Search tweets',
      accepts: [
        {arg: 'query', type: 'string', http: {source: 'query'}, required: true}
      ],
      returns: {type: 'object', root: true},
      http: {verb: 'get'}
    }
  );
};
