window.onload = function(){	
	var postCount = 10;
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

	$('#postForm').submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();
	    // Serialize the form data.
		var formData = $('#postForm').serialize();
		// Submit the form using AJAX.
		$.ajax({
		    type: 'POST',
		    url: $('#postForm').attr('action'),
		    data: formData,
		    success: function(data){
				$("ul").prepend(data);
		    }
		});
	});
}