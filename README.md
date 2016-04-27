# Twitter Challenge

A sample app which retrieves tweets and displays them.

For backend, I created a REST API with [loopback](https://loopback.io/). The API documnetation can be found under /explorer/#. The authentication is done with access tokens. 

In order to be able to access the twitter API, you must create an app on [twitter](https://apps.twitter.com/) in order to obtain credentials.

For user registration and password recovery, it uses emails and thus you need an smtp server configured. For exmaple, you can use gmail.

The frontend, is created with [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/index.html).

### Get Started
- **Clone this repository**
```bash
$ git clone git@github.com:horiaradu/twitter-challenge.git
```

- **Install dependencies specified in package.json**
```bash
$ npm install
```

- **Start the server (default port is set to 3000)**
```bash
$ npm start
```

### Scripts
- **npm run deploy**: Bundles the application into `.build/dist`.

- **npm run start_prod**: Starts production server, make sure you have already deployed the application.

- **npm run clean**: Removes the bundled files.

### Required environment variables

```bash
# twitter API credentials
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
# gmail credentials for sending out emails
GMAIL_AUTH_USER=
GMAIL_AUTH_PASSWORD=
# dummy username and password
DUMMY_USER=
```

### License

[MIT](LICENSE)

### Copyright

Copyright (C) 2015 Tony Ngan, released under the MIT License.
