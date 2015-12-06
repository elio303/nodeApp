var PostDAO = require('./PostDAO.js');
var Converter = require('./converter.js');

var listOfPosts = function(numPosts, callback){
	PostDAO.list(numPosts, function(err, postDAOs){
		if(err){
			console.error(err);
		}
		postBOs = [];
		if(postDAOs.length == 0){
			callback(err, postBOs);
		}
		else{
			postDAOs.forEach(function(postDAO, index, array) {
				postBOs.push(Converter.convertFromPostDAOtoPostBO(postDAO));
				if(index==(array.length - 1)){
					callback(err, postBOs);
				}
			});
		}
	});
}

module.exports = listOfPosts;