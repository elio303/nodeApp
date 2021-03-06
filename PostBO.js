var Converter = require('./converter.js');

function PostBO(id, name, message){
	this._id = id;
	this._name = name;
	this._message = message;
}

PostBO.prototype.getId = function(){
	return this._id;
}

PostBO.prototype.getName = function(){
	return this._name;
}

PostBO.prototype.getMessage = function(){
	return this._message;
}

PostBO.prototype.setId = function(id){
	this._id = id;
}

PostBO.prototype.setName = function(name){
	this._name = name;
}

PostBO.prototype.setMessage = function(message){
	this._message = message;
}

PostBO.prototype.save = function(callback){
	var postDAO = Converter.convertFromPostBOtoPostDAO(this);
	postDAO.save(function(err, postDAOReturned){
		if(err){
			console.error(err);
		}
		var postBO = Converter.convertFromPostDAOtoPostBO(postDAOReturned);
		callback(err, postBO);
	});
}

module.exports = PostBO;