module.exports = function (user) {
  'use strict';

  user.afterRemote('create', function (context, user, next) {
    console.log('> user.afterRemote triggered');

    const options = {
      type: 'email',
      to: user.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: require('path').resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '%2F%23%2Fverified',
      user: user
    };

    user.verify(options)
      .then((response) => {
        console.log('> verification email sent:', response);
        next();
      })
      .catch(next);
  });

  user.on('resetPasswordRequest', function (info) {
    const config = require('../../server/config.json');
    const url = 'http://' + config.host + ':' + config.port + '/#/reset-password';

    const html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    user.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function (err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //reset the user's password
  user.reset = (payload, req, res) => {
    if (!req.accessToken) return res.sendStatus(401);

    //verify passwords match
    if (!req.body.password || !req.body.confirmation ||
      req.body.password !== req.body.confirmation) {
      return res.sendStatus(400, new Error('Passwords do not match'));
    }

    user.findById(req.accessToken.userId)
      .then((user) => user.updateAttribute('password', req.body.password))
      .then(() => {
        console.log('> password reset processed successfully');
        res.sendStatus(200)
      })
      .catch(() => res.sendStatus(404));
  };

  user.resetPasswordRequest = (email) =>
    user.resetPassword({
      email: email
    });

  user.remoteMethod(
    'resetPasswordRequest',
    {
      description: 'Request a password reset',
      accepts: [
        {arg: 'email', type: 'string', http: {source: 'query'}, required: true},
      ],
      returns: {type: 'object', root: true},
      http: {verb: 'post', path: '/reset-password-request'}
    }
  );

  user.remoteMethod(
    'reset',
    {
      description: 'Reset the password',
      accepts: [
        {arg: 'payload', type: 'object', http: {source: 'body'}, required: true},
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'res', type: 'object', http: {source: 'res'}}
      ],
      returns: {type: 'object', root: true},
      http: {verb: 'post', path: '/reset-password'}
    }
  );
};