/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var app = express();
var MongoStore = require('connect-mongo')(express);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  store: new MongoStore({
    host: 'localhost',
    db: 'face-sessions',
    collection: 'sessions',
  }),
  key: 'faces',
  secret: '1234567890QWERTY',
  cookie: {
    path: '/',
    maxAge: 172800000
  }
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// GETS
app.get('/', routes.faces.index);
app.get('/books', routes.books.all);
app.get('/books/:id', routes.books.one);
app.get('/faces', routes.faces.index);

// POSTS
app.post('/books', routes.books.create);
app.post('/faces', routes.faces.save);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
