var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var moment = require('moment');
var http = require('http');
var port = 3015;

var WebSocket = require('ws');

var app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

app.use(function (req, res) {
    res.render('home', {
      is_production: is_production
    })
});


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log('hdhdh', client)
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// use like this:
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    wss.broadcast(message);
  });
});
server.listen(port, function() {
  console.log('listening on port ', port)
});
