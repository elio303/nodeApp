var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var database = require('./database.js');
var connected = false;
var listOfPosts = require('./listOfPosts');
var addNewMessage = require('./addNewMessage');

app.set('port', (process.env.PORT || 5000));
app.set('views',  __dirname + '/views/pages');
app.set('partials',  __dirname + '/views/partials');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	if(!connected){
		database.connect();
    	connected = true;
	}
	next();
});

// Load routes
require('./router.js')(app);

// Load Socket IO
require('./socket.js')(server);

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports.server = server;
