var express = require('express'),
  editor = require('./routes/editor'),
  workspace = require('./routes/workspace'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  passport = require("passport"),
  flash = require("connect-flash"),
  fs = require('fs');

var env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env];

mongoose.connect(config.db);

var models_dir = __dirname + '/models';
fs.readdirSync(models_dir).forEach(function (file) {
  if (file[0] === '.') return;
  require(models_dir + '/' + file);
});

require('./config/passport')(passport, config)

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/editor', editor.editor);
app.get('/workspaces', workspace.list);
app.get('/workspace/:name', workspace.get);
app.get('/w/:name', workspace.workspace); // don't need that actually.

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(function (req, res, next) {
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

require('./routes/index')(app, passport);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
