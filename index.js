var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan(app.get('env') === 'production' ? 'common' : 'dev'));

var compression = require('compression');
app.use(compression());

app.use('/public', express.static(__dirname + '/public'));

var redis = require('redis');
var client = redis.createClient({
  host: process.env.REDIS_PORT_6379_TCP_ADDR || 'localhost',
  port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
});

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(session({
  secret: 'winebox_secret_key',
  store: new RedisStore({client: client}),
  resave: true,
  saveUninitialized: true
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Express server listening on http://localhost:3000...');
});
