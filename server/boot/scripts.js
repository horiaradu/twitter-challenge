module.exports = function (app) {
  return app.models.User.create([
      {email: process.env.DUMMY_USER, password: process.env.DUMMY_PASSWORD, emailVerified: true}
    ])
    .then((result) => console.log('created default user'));
};