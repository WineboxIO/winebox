var express = require('express');
var app = express();
var morgan = require('morgan');

//for production
//app.set('env', 'production');

app.use(morgan(app.get('env') === 'production' ? 'common' : 'dev'));

var compression = require('compression');
app.use(compression());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Express server listening on http://localhost:3000...');
});
