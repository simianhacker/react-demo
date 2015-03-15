var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var join = path.join;
var abs = path.resolve.bind(null, __dirname);
var http = require('http');
var connect = require('connect');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var livereload = require('gulp-livereload');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});


var paths = {
  src: abs('src'),
  dest: abs('public'),
  entry: 'main.jsx'
};

var printStats = function (stats) {
  var names = stats.toJson().assets.forEach(function (asset) {
    gutil.log(gutil.colors.green('✓'), 're-built', asset.name);
  });
};

gulp.task('webpack', function (done) {
  var packer = getPacker();
  packer.run(function (err, stats) {
    if (err) return gutil.error(new gutil.PluginError('webpack', err));
    if (stats.hasErrors() || stats.hasWarnings()) return gutil.log(stats.toString());
    printStats(stats);
    done();
  });
});

gulp.task('dev', function (done) {

  var packer = getPacker(true);
  packer.watch(200, function (err, stats) {
    if (err) return gutil.error(new gutil.PluginError('webpack', err));
    if (stats.hasErrors() || stats.hasWarnings()) return gutil.log(stats.toString());
    printStats(stats);
    setTimeout(function () {
      livereload.reload();
    }, 500);
  });
  process.on('exit', function () {
    if (packer.watcher) packer.watcher.close();
  });

  livereload.listen();

  var app = connect()
    .use(morgan('dev'))
    .use(serveStatic(paths.dest, { index: ['index.html'] }))
    .use(function (req, res, next) {
      if (/^\/couch/.test(req.url)) {
        req.url = req.url.replace(/^\/couch/, '');
        return proxy.web(req, res, { target: 'http://127.0.0.1:5984/' });
      }
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'not found' }));
    })
  var server = http.createServer(app);
  server.listen(3000, function (err) {
    console.log('Development server started on http://localhost:%d', 3000);
  });


});

var getPacker = function (dev) {
  var config = require('./webpack.config');
  return webpack(config(paths, dev));
};
