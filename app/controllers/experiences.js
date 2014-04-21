module.exports = function(app){
	var User = app.get('models').User;
	var Campaign = app.get('models').Campaign;
	var Experience = app.get('models').Experience;
	var Sequelize = app.get('models').sequelize;
	

	function _list(req, res){
		req.user.getWebproperties({
			where:{
				'webproperties.id': req.params.propid,
				'campaigns.id': req.params.cid
			},
			include: [{
				model: Campaign,
				include: [Experience]
			}]
		}).then(function(webprop){
			if(!webprop) return res.send(404);
			res.send(200, webprop[0].campaigns[0].experiences);
		}, function(err){
			res.send(400, err);
		})
	}

	function _get(req, res){
		var QUERY = 'SELECT e.name, e.code, e.createdAt, e.updatedAt FROM users u ' +
			'JOIN webproperties as prop ON u.id = prop.userId ' +
			'JOIN campaigns as c ON prop.id = c.webpropertyId ' +
			'JOIN experiences as e on c.id = e.campaignId ' +
			'WHERE prop.id = :propid AND c.id = :cid AND e.id = :eid AND u.id = :uid';

		Sequelize.query(QUERY, Experience, {raw: true},{
			propid: req.params.propid,
			cid: req.params.cid,
			eid: req.params.eid,
			uid: req.user.get('id')
		}).then(function(exp){
			if(!exp) return res.send(404);
			res.send(200, exp[0]);
		}, function(err){
			res.send(400, err);
		})
	}

	return {
		list: _list,
		get: _get
	}
}