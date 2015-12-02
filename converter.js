var PostDAO = require('./PostDAO');
var PostBO = require('./PostBO');

var convertFromPostBOtoPostDAO = function(postBO){
	return PostDAO.create(postBO.getId(), postBO.getName(), postBO.getMessage());
}

var convertFromPostDAOtoPostBO = function(postDAO){
	return new PostBO(postDAO._id, postDAO.name, postDAO.message);
}

module.exports.convertFromPostBOtoPostDAO = convertFromPostBOtoPostDAO;
module.exports.convertFromPostDAOtoPostBO = convertFromPostDAOtoPostBO;