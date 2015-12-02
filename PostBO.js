var PostDAO = require('./PostDAO.js');
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
	postDAO.save(function(err, data){
		if(err){
			console.error(err);
		}
		callback(err, data);
	});
}

PostBO.prototype.list = function(postDAOs, callback){
	postBOs = {};
	Object.keys(postDAOs).forEach(function(key) {
			postBOs[key] = Converter.convertFromPostDAOtoPostBO(postDAOs[key]);
			callback(err, postBOs);
	});
}

module.exports = PostBO;