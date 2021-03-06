const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();
const path = require('path');
const webpack = require('webpack');
const env = require('./environment');
const mode = process.env.NODE_ENV || env.DEVELOPMENT;
const config = require(`../webpack.config.${mode}`);
const compiler = webpack(config);
const webpackHotMiddleware = require('webpack-hot-middleware');

if (mode === env.DEVELOPMENT) {
  // only need in development
  const webpackDevMiddleware = require('webpack-dev-middleware');

  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
} else {
  app.use(loopback.static(path.resolve(__dirname, '../.build/dist')));
}
app.use(webpackHotMiddleware(compiler));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

boot(app, __dirname);

app.start = () =>
  // start the web server
  app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });

if (require.main === module) {
  app.start();
}
