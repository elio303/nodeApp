var PostBO = require('./PostBO.js');
var PostDAO = require('./PostDAO.js');
var mongoose = require('mongoose');

var listOfPosts = function(callback){
	PostDAO.list(function(err, postDAOs){
		if(err){
			console.error(err);
		}
		postBOs = [];
		Object.keys(postDAOs).forEach(function(key) {
			var postDAO = postDAOs[key]
			// Should use converter here
			postBOs.push(new PostBO(postDAO._id, postDAO.name, postDAO.message));
			callback(err, postBOs);
		});
	});
}

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

module.exports.listOfPosts = listOfPosts;
module.exports.addNewMessage = addNewMessage;