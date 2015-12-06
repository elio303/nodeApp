var mongoose = require('mongoose');
var GLOBAL_CONSTANTS = require('./GLOBAL_CONSTANTS.js');

var postDAOSchema = new mongoose.Schema({
	_id : {
		type: mongoose.Schema.Types.ObjectId, 
		trim: true 
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	message : {
		type: String, 
		trim: true,
		required: true
	},
	time : { 
		type : Date, 
		default: Date.now 
	}, 
}, {collection: GLOBAL_CONSTANTS.MODEL.TABLE_NAMES.POST, _id: false});

postDAOSchema.statics.create = function(id, name, message){
	return new PostDAO({
		_id: id,
		name: name,
		message: message
	});
};

postDAOSchema.statics.list = function(numPostSkip, callback){
	PostDAO.find({}, null, {skip: numPostSkip, limit: 10, sort: {'time': -1}}, function(err, postDAOs) {
		if(err){
			console.error("Error when finding posts in DB: " + err);
		}
		var postMap = {};
		if(postDAOs.length == 0){
			callback(err, postDAOs);
		}
		else{
			callback(err, postDAOs);
		}
	});
};


var PostDAO = mongoose.model("PostDAO", postDAOSchema);
module.exports = PostDAO;