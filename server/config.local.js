module.exports = {
  remoting: {
    errorHandler: {
      handler: function (err, req, res, next) {
        console.log(err.stack);
        next();
      }
    }
  }
};
