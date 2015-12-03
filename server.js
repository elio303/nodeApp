var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var database = require('./database.js');
var connected = false;
var routeHandler = require('./routeHandler.js');

app.set('port', (process.env.PORT || 5000));
app.set('views',  __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	if(!connected){
		database.connect();
    	connected = true;
	}
	next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/sent', function(req, res) {
	res.render('index');
})

app.post('/sent', function(req, res) {
	var name = req.body.name;
	var message = req.body.message;
	// adding message to DB
	routeHandler.addNewMessage(name, message);
	// Getting all messages from DB
	routeHandler.listOfPosts(function(err, posts){
		if(err){
			console.log(err);
		}
		res.render('sent', {
		    name: name,
		    message: message,
		    posts: posts.reverse()
		});
	});
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports.server = server;