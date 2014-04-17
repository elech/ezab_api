var jwt = require('jsonwebtoken');
module.exports = function(app){
	var User = app.get('models').User;
	function _create(){
		User.findOne({})
	}
	return {
		create: _create
	}
}