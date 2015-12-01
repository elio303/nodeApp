var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.set('views',  __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/sent', function(req, res) {
	var name = req.body.name;
	var message = req.body.message;
    res.render('sent', {
    	name: name,
    	message: message
    });
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});