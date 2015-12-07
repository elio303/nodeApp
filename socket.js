module.exports = function(server){
	var USERCOUNT = 0;
	var io = require('socket.io')(server);
	var addNewMessage = require('./addNewMessage');

	// Checks for user connection
	io.on('connection', function(socket){
		USERCOUNT = USERCOUNT + 1;
		console.log('# of users: ' + USERCOUNT);

		// Action when user disconnects
		socket.on('disconnect', function(){
			USERCOUNT = USERCOUNT - 1;
			console.log('# of users: ' + USERCOUNT);
		});

		socket.on('message', function(data){
			// Adding message
			var name = data.name;
			var message = data.message;
			addNewMessage(name, message, function(err, postBO){
				// Broadcasting to other clients on success
				socket.broadcast.emit('message', {
					name: name,
					message: message
				});
			});
		});
	});
}