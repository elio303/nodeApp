var PostBO = require('./PostBO.js')
var mongoose = require('mongoose');

var addNewMessage = function(name, message){
	var newPostBO = new PostBO(mongoose.Types.ObjectId(), name, message);
	if (newPostBO){
		newPostBO.save(function(err, postBO){
			if(err){
				console.error(err);
			}
			else{
				//Do something here
			}
		});
	}
}

module.exports = addNewMessage;