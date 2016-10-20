var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var moment = require('moment');
var port = 3015;

var app = express();

var ENV = process.env.NODE_ENV;
var is_production = true;

if (ENV === 'development') {
  is_production = false;
}
app.locals.is_production = ENV !== 'development';

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

// // view engine setup
app.set('view engine', 'hbs');

app.set('case sensitive routing', true);

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('home', {
    is_production: is_production
  })
})

app.listen(port, function() {
  console.log('listening on port ', port)
});
