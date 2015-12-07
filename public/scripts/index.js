window.onload = function(){
	// Connecting to Socket IO
	var socket = io();	
	// Initializing number of posts global
	var postCount = 10;

	// Action when show more button is clicked
	$('#show').click(function(){
		$.ajax({
			method: 'POST',
			url: "/show",
			data: {count: postCount},
			success: function(data){
				if(data.done !='done'){
					$("ul").append(data);
				}
				else{
					$('#show').remove();
				}
				postCount = postCount + 10;
			}
		});
	});

	// When form submits, use sockets to broadcasts
	$('#postForm').submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();
	    // Serialize the form data.
		var formData = $('#postForm').serialize();
		// Add post to page
		var name = $('#name').val();
		var message = $('#message').val();
		$("ul").prepend('<li>' + name + ' says:<br>' + message + '<br></li>');
		// Broadcast to others
		socket.emit('message', {
			name: name,
			message: message
		});
	});

	// Receiving broadcast and adding to messages
	socket.on('message', function(data){
    	$("ul").prepend('<li>' + data.name + ' says:<br>' + data.message + '<br></li>');
  	});
}