var PostBO = require('./PostBO.js')
var mongoose = require('mongoose');

var addNewMessage = function(name, message, callback){
	var newPostBO = new PostBO(mongoose.Types.ObjectId(), name, message);
	if (newPostBO){
		newPostBO.save(function(err, postBO){
			if(err){
				console.error(err);
			}
			else{
				callback(err, postBO);
			}
		});
	}
}

module.exports = addNewMessage;