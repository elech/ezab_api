module.exports = function(app){
	var User = app.get('models').User;
	var Campaign = app.get('models').Campaign;

	function _list(req, res){
		return res.send(200, []);
	}

	return {
		list: _list
	}
}