window.onload = function(){	
	$('#show').click(function(){
		$.ajax({
			method: "GET",
			url: "/show",
			success: function(data){
				if(data.done !='done'){
					$("ul").append(data);
				}
				else{
					$('#show').remove();
				}
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