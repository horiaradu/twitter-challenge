module.exports = function (app) {
  return app.models.User.create([
      {email: 'horia.radu23@gmail.com', password: 'bubulina', emailVerified: true}
    ])
    .then((result) => console.log('created default user'));
};