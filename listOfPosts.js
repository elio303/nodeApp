var PostDAO = require('./PostDAO.js');
var Converter = require('./converter.js');

var listOfPosts = function(callback){
	PostDAO.list(function(err, postDAOs){
		if(err){
			console.error(err);
		}
		postBOs = [];
		if(Object.keys(postDAOs).length == 0){
			callback(err, postBOs);
		}
		else{
			Object.keys(postDAOs).forEach(function(key, index, array) {
				var postDAO = postDAOs[key]
				// Should use converter here
				//postBOs.push(new PostBO(postDAO._id, postDAO.name, postDAO.message));
				postBOs.push(Converter.convertFromPostDAOtoPostBO(postDAO));
				if(index==(array.length - 1)){
					callback(err, postBOs);
				}
			});
		}
	});
}

module.exports = listOfPosts;