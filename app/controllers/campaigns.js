module.exports = function(app){
	var User = app.get('models').User;
	var Campaign = app.get('models').Campaign;

	function _list(req, res){
		req.user.getWebproperties({where: {'webproperties.id': req.params.propid}, include: [Campaign]}).then(function(prop){
			if(!prop || prop.length !== 1) return res.send(404);
			return res.send(200, prop[0].campaigns);
		}, function(err){
			return res.send(500, err);
		})
	}

	return {
		list: _list
	}
}